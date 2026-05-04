"use client";

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Conversation } from "@/lib/conversations";
import { useTranslations } from "@/components/translations-context";

export interface Tool {
  name: string;
  description: string;
  parameters?: Record<string, any>;
}

interface UseWebRTCAudioSessionReturn {
  status: string;
  isSessionActive: boolean;
  audioIndicatorRef: React.RefObject<HTMLDivElement | null>;
  startSession: () => Promise<void>;
  stopSession: () => void;
  handleStartStopClick: () => void;
  registerFunction: (name: string, fn: Function) => void;
  msgs: any[];
  currentVolume: number;
  conversation: Conversation[];
  sendTextMessage: (text: string) => void;
}

const LOG = (...args: unknown[]) => console.log("[webrtc]", ...args);
const WARN = (...args: unknown[]) => console.warn("[webrtc]", ...args);
const ERR = (...args: unknown[]) => console.error("[webrtc]", ...args);

/**
 * Manage a real-time voice session against the OpenAI Realtime API.
 *
 * Identity: connected wallet address (lowercase 0x…), passed in by the
 * parent and forwarded to /api/session and /api/usage as
 * `X-Wallet-Address`. No Firebase auth is involved.
 *
 * Logging: this hook is intentionally chatty (mic / ICE / DC / track
 * events) so that voice failures can be diagnosed from the browser
 * console. All logs are prefixed `[webrtc]`.
 */
export default function useWebRTCAudioSession(
  voice: string,
  tools?: Tool[],
  personaPrompt?: string,
  personaId?: string,
  walletAddress?: string | null,
): UseWebRTCAudioSessionReturn {
  const { t, locale } = useTranslations();

  const [status, setStatus] = useState("");
  const [isSessionActive, setIsSessionActive] = useState(false);

  const conversationRef = useRef<{ question: string | null; answer: string | null }>({
    question: null,
    answer: null,
  });

  const audioIndicatorRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);

  const [msgs, setMsgs] = useState<any[]>([]);
  const [conversation, setConversation] = useState<Conversation[]>([]);

  const functionRegistry = useRef<Record<string, Function>>({});

  const [currentVolume, setCurrentVolume] = useState(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const volumeIntervalRef = useRef<number | null>(null);

  const ephemeralUserMessageIdRef = useRef<string | null>(null);

  const resetConversation = () => {
    conversationRef.current = { question: null, answer: null };
  };

  function registerFunction(name: string, fn: Function) {
    functionRegistry.current[name] = fn;
  }

  /** Configure the data channel on open: session.update + persona prompt. */
  function configureDataChannel(dataChannel: RTCDataChannel) {
    LOG("DC configure: sending session.update + persona prompt");
    const sessionUpdate = {
      type: "session.update",
      session: {
        modalities: ["text", "audio"],
        tools: tools || [],
        input_audio_transcription: {
          model: "whisper-1",
        },
      },
    };
    dataChannel.send(JSON.stringify(sessionUpdate));
    LOG("DC sent session.update; tools count =", tools?.length ?? 0);

    const promptToUse = personaPrompt || t("languagePrompt");
    LOG(
      "DC sending persona prompt (len=",
      promptToUse?.length ?? 0,
      ", locale=",
      locale,
      ")"
    );

    const languageMessage = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: promptToUse,
          },
        ],
      },
    };
    dataChannel.send(JSON.stringify(languageMessage));
  }

  function getOrCreateEphemeralUserId(): string {
    let ephemeralId = ephemeralUserMessageIdRef.current;
    if (!ephemeralId) {
      ephemeralId = uuidv4();
      ephemeralUserMessageIdRef.current = ephemeralId;
      const newMessage: Conversation = {
        id: ephemeralId,
        role: "user",
        text: "",
        timestamp: new Date().toISOString(),
        isFinal: false,
        status: "speaking",
      };
      setConversation((prev) => [...prev, newMessage]);
    }
    return ephemeralId;
  }

  function updateEphemeralUserMessage(partial: Partial<Conversation>) {
    const ephemeralId = ephemeralUserMessageIdRef.current;
    if (!ephemeralId) return;
    setConversation((prev) =>
      prev.map((msg) => (msg.id === ephemeralId ? { ...msg, ...partial } : msg))
    );
  }

  function clearEphemeralUserMessage() {
    ephemeralUserMessageIdRef.current = null;
  }

  /** Main DC message handler. */
  async function handleDataChannelMessage(event: MessageEvent) {
    try {
      const msg = JSON.parse(event.data);

      // Compact log: type + length where applicable.
      const debugSummary = (() => {
        if (typeof msg.delta === "string") return `delta(${msg.delta.length})`;
        if (typeof msg.transcript === "string")
          return `transcript(${msg.transcript.length})`;
        return "";
      })();
      if (
        msg.type !== "response.audio_transcript.delta" &&
        msg.type !== "response.audio.delta" &&
        msg.type !== "response.text.delta"
      ) {
        LOG("DC <-", msg.type, debugSummary);
      }

      switch (msg.type) {
        case "input_audio_buffer.speech_started": {
          getOrCreateEphemeralUserId();
          updateEphemeralUserMessage({ status: "speaking" });
          break;
        }
        case "input_audio_buffer.speech_stopped": {
          updateEphemeralUserMessage({ status: "speaking" });
          break;
        }
        case "input_audio_buffer.committed": {
          updateEphemeralUserMessage({
            text: "Processing speech...",
            status: "processing",
          });
          break;
        }
        case "conversation.item.input_audio_transcription": {
          const partialText = msg.transcript ?? msg.text ?? "User is speaking...";
          updateEphemeralUserMessage({
            text: partialText,
            status: "speaking",
            isFinal: false,
          });
          break;
        }
        case "conversation.item.input_audio_transcription.completed": {
          const finalTranscript = msg.transcript || "";
          LOG("user transcript (final):", JSON.stringify(finalTranscript));
          updateEphemeralUserMessage({
            text: finalTranscript,
            isFinal: true,
            status: "final",
          });
          clearEphemeralUserMessage();
          conversationRef.current.question = finalTranscript;
          break;
        }
        case "response.audio_transcript.delta": {
          const newMessage: Conversation = {
            id: uuidv4(),
            role: "assistant",
            text: msg.delta,
            timestamp: new Date().toISOString(),
            isFinal: false,
          };
          setConversation((prev) => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg && lastMsg.role === "assistant" && !lastMsg.isFinal) {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...lastMsg,
                text: lastMsg.text + msg.delta,
              };
              return updated;
            } else {
              return [...prev, newMessage];
            }
          });
          break;
        }
        case "response.audio_transcript.done": {
          setConversation((prev) => {
            if (prev.length === 0) return prev;
            const updated = [...prev];
            updated[updated.length - 1].isFinal = true;
            conversationRef.current.answer = updated[updated.length - 1].text;
            LOG(
              "assistant transcript (final, len=",
              updated[updated.length - 1].text.length,
              ")"
            );
            return updated;
          });
          break;
        }
        case "response.function_call_arguments.done": {
          LOG("tool call:", msg.name, "args:", msg.arguments);
          const fn = functionRegistry.current[msg.name];
          if (fn) {
            const args = JSON.parse(msg.arguments);
            const result = await fn(args);
            const response = {
              type: "conversation.item.create",
              item: {
                type: "function_call_output",
                call_id: msg.call_id,
                output: JSON.stringify(result),
              },
            };
            dataChannelRef.current?.send(JSON.stringify(response));
            dataChannelRef.current?.send(JSON.stringify({ type: "response.create" }));
          } else {
            WARN("tool call for unregistered function:", msg.name);
          }
          break;
        }
        case "error": {
          ERR("OpenAI Realtime error event:", msg);
          break;
        }
        default:
          break;
      }

      setMsgs((prevMsgs) => [...prevMsgs, msg]);
      return msg;
    } catch (error) {
      ERR("DC message parse/handle failed:", error);
    }
  }

  /** Fetch ephemeral OpenAI Realtime token via /api/session. */
  async function getEphemeralToken() {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (walletAddress) {
      headers["X-Wallet-Address"] = walletAddress;
      LOG("calling /api/session with wallet", walletAddress);
    } else {
      LOG("calling /api/session without wallet (free tier only)");
    }

    const response = await fetch("/api/session", {
      method: "POST",
      headers,
      body: JSON.stringify({ voice }),
    });

    let data: any;
    try {
      data = await response.json();
    } catch (e) {
      if (!response.ok) {
        throw new Error(
          `Failed to get ephemeral token: ${response.status} ${response.statusText}`
        );
      }
      throw e;
    }

    if (!response.ok) {
      ERR("/api/session error:", response.status, data);

      // Access-control denials: route via known message prefixes the
      // demo page intercepts.
      if (response.status === 402 && data?.code === "free_exhausted") {
        const e: Error & { code?: string } = new Error(
          data.message ||
            "You've used your free prompts for today. Connect a wallet and buy credits to keep talking."
        );
        e.code = "free_exhausted";
        throw e;
      }

      if (response.status === 429) {
        throw new Error(
          data.message ||
            "Daily voice-session limit reached. Try again tomorrow or top up."
        );
      }
      if (response.status === 403) {
        if (
          data.code === "unsupported_country_region_territory" ||
          data?.error?.code === "unsupported_country_region_territory"
        ) {
          throw new Error(
            "This service is not available in your current location. Please try using a VPN or contact support."
          );
        }
        if (data.message) throw new Error(`Location Error: ${data.message}`);
        throw new Error(
          "Access denied. Could be region restrictions or API key issues."
        );
      }
      if (typeof data?.error === "string") throw new Error(data.error);
      if (data?.error?.message) throw new Error(data.error.message);
      if (data?.message) throw new Error(data.message);
      throw new Error(`Failed to get ephemeral token: ${response.status}`);
    }

    if (!data.client_secret?.value) {
      throw new Error("Invalid response format from /api/session");
    }
    LOG(
      "ephemeral token received; tier =",
      data.axtora?.tier,
      "creditSeconds =",
      data.axtora?.creditSeconds
    );
    return data.client_secret.value;
  }

  /** Local-mic visualisation. */
  function setupAudioVisualization(stream: MediaStream) {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;
    source.connect(analyzer);

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const updateIndicator = () => {
      if (!audioContext) return;
      analyzer.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      if (audioIndicatorRef.current) {
        audioIndicatorRef.current.classList.toggle("active", average > 30);
      }
      requestAnimationFrame(updateIndicator);
    };
    updateIndicator();
    audioContextRef.current = audioContext;
  }

  function getVolume(): number {
    if (!analyserRef.current) return 0;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteTimeDomainData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const float = (dataArray[i] - 128) / 128;
      sum += float * float;
    }
    return Math.sqrt(sum / dataArray.length);
  }

  async function startSession() {
    LOG("startSession called; persona =", personaId, "voice =", voice);
    try {
      resetConversation();
      setStatus("Requesting microphone access...");

      // ---- 1) Mic
      LOG("requesting getUserMedia({ audio: true })");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      const tracks = stream.getAudioTracks();
      tracks.forEach((track, i) => {
        LOG(
          `mic track[${i}] label="${track.label}" enabled=${track.enabled} muted=${track.muted} readyState=${track.readyState}`
        );
        track.onmute = () => WARN(`mic track[${i}] muted`);
        track.onunmute = () => LOG(`mic track[${i}] unmuted`);
        track.onended = () => WARN(`mic track[${i}] ended`);
      });
      setupAudioVisualization(stream);

      // ---- 2) Token
      setStatus("Fetching ephemeral token...");
      const ephemeralToken = await getEphemeralToken();

      // ---- 3) Peer connection
      setStatus("Establishing connection...");
      const pc = new RTCPeerConnection();
      peerConnectionRef.current = pc;

      pc.oniceconnectionstatechange = () =>
        LOG("ICE state ->", pc.iceConnectionState);
      pc.onconnectionstatechange = () => {
        LOG("PC state ->", pc.connectionState);
        if (pc.connectionState === "failed") {
          ERR("peer connection failed");
          setStatus("Error: peer connection failed");
        }
      };
      pc.onsignalingstatechange = () =>
        LOG("signaling state ->", pc.signalingState);
      pc.onicegatheringstatechange = () =>
        LOG("ICE gathering ->", pc.iceGatheringState);
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          LOG(
            "local ICE candidate:",
            e.candidate.candidate?.split(" ").slice(0, 6).join(" ")
          );
        }
      };

      // Hidden <audio> element for inbound assistant TTS.
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      audioEl.onplay = () => LOG("assistant audio: play");
      audioEl.onpause = () => LOG("assistant audio: pause");
      audioEl.onerror = (e) => ERR("assistant audio error:", e);

      pc.ontrack = (event) => {
        LOG(
          "ontrack: kind=",
          event.track.kind,
          "id=",
          event.track.id,
          "streams=",
          event.streams.length
        );
        audioEl.srcObject = event.streams[0];
        audioEl.play().catch((err) => {
          ERR("assistant audio.play() rejected:", err);
        });

        const audioCtx = new (window.AudioContext || window.AudioContext)();
        const src = audioCtx.createMediaStreamSource(event.streams[0]);
        const inboundAnalyzer = audioCtx.createAnalyser();
        inboundAnalyzer.fftSize = 256;
        src.connect(inboundAnalyzer);
        analyserRef.current = inboundAnalyzer;

        volumeIntervalRef.current = window.setInterval(() => {
          setCurrentVolume(getVolume());
        }, 100);
      };

      // Data channel
      const dataChannel = pc.createDataChannel("response");
      dataChannelRef.current = dataChannel;
      dataChannel.onopen = () => {
        LOG("DC open");
        configureDataChannel(dataChannel);
      };
      dataChannel.onclose = () => LOG("DC closed");
      dataChannel.onerror = (e) => ERR("DC error:", e);
      dataChannel.onmessage = handleDataChannelMessage;

      // Add local mic track
      pc.addTrack(stream.getTracks()[0]);
      LOG("added local audio track to PC");

      // SDP offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      LOG("local SDP set; offer length =", offer.sdp?.length ?? 0);

      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      const supportedRealtimeVoices = [
        "alloy",
        "echo",
        "shimmer",
        "ash",
        "ballad",
        "coral",
        "sage",
        "verse",
      ];
      const rtVoice = supportedRealtimeVoices.includes(voice) ? voice : "ash";
      const apiUrl = `${baseUrl}?model=${model}&voice=${rtVoice}`;
      LOG("posting SDP to", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephemeralToken}`,
          "Content-Type": "application/sdp",
        },
      });

      if (!response.ok) {
        const errBody = await response.text().catch(() => "");
        ERR("OpenAI SDP exchange failed:", response.status, errBody);
        throw new Error(
          `Realtime SDP exchange failed: ${response.status} ${response.statusText}`
        );
      }
      const answerSdp = await response.text();
      LOG("received remote SDP; length =", answerSdp.length);
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });

      setIsSessionActive(true);
      setStatus("Session established successfully!");
      LOG("session active");
    } catch (err) {
      ERR("startSession failed:", err);
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Error: ${message}`);
      stopSession();
    }
  }

  function stopSession() {
    LOG("stopSession");
    if (dataChannelRef.current) {
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => {
        LOG(`stopping mic track id=${track.id}`);
        track.stop();
      });
      audioStreamRef.current = null;
    }
    if (audioIndicatorRef.current) {
      audioIndicatorRef.current.classList.remove("active");
    }
    if (volumeIntervalRef.current) {
      clearInterval(volumeIntervalRef.current);
      volumeIntervalRef.current = null;
    }
    analyserRef.current = null;
    ephemeralUserMessageIdRef.current = null;

    setCurrentVolume(0);
    setIsSessionActive(false);
    setStatus("Session stopped");
    setMsgs([]);
    setConversation([]);
  }

  function handleStartStopClick() {
    if (isSessionActive) {
      stopSession();
    } else {
      startSession();
    }
  }

  function sendTextMessage(text: string) {
    if (!dataChannelRef.current || dataChannelRef.current.readyState !== "open") {
      ERR("sendTextMessage: data channel not ready");
      return;
    }
    const messageId = uuidv4();
    const newMessage: Conversation = {
      id: messageId,
      role: "user",
      text,
      timestamp: new Date().toISOString(),
      isFinal: true,
      status: "final",
    };
    setConversation((prev) => [...prev, newMessage]);
    conversationRef.current.question = text;
    conversationRef.current.answer = null;

    const message = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text }],
      },
    };
    dataChannelRef.current.send(JSON.stringify(message));
    dataChannelRef.current.send(JSON.stringify({ type: "response.create" }));
  }

  useEffect(() => {
    return () => stopSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    status,
    isSessionActive,
    audioIndicatorRef,
    startSession,
    stopSession,
    handleStartStopClick,
    registerFunction,
    msgs,
    currentVolume,
    conversation,
    sendTextMessage,
  };
}
