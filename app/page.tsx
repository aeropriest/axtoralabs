"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/* Link destinations                                                   */
/* ------------------------------------------------------------------ */
const LINKS = {
  whitepaper: "/whitepaper",
  technology: "/whitepaper#technology",
  patent: "/whitepaper#patent-technical-architecture",
  patentPortfolio: "/whitepaper#patent-portfolio",
  baseVirtuals: "/whitepaper#virtuals-protocol-integration",
  tokenomics: "/whitepaper#the-axtora-token",
  roadmap: "/whitepaper#roadmap",
  voiceContribution:
    "mailto:hello@axtoralabs.com?subject=Voice%20Contribution%20Program",
  bookDemo:
    "mailto:hello@axtoralabs.com?subject=Book%20a%20Demo%20-%20Axtora%20Labs&body=Hi%20Axtora%20Labs%20team%2C%0A%0AI%27d%20like%20to%20book%20a%20demo.%0A%0AName%3A%0ACompany%3A%0AUse%20case%3A%0APreferred%20time%3A%0A",
  contact: "mailto:hello@axtoralabs.com",
  press: "mailto:press@axtoralabs.com",
  careers: "mailto:careers@axtoralabs.com",
  twitter: "https://x.com/axtoralabs",
  telegram: "https://t.me/axtoralabs",
  discord: "https://discord.gg/axtoralabs",
};

/* ------------------------------------------------------------------ */
/* Demo scenarios                                                      */
/* ------------------------------------------------------------------ */
type DemoScenario = {
  context: { k: string; v: string }[];
  msgs: { role: "user" | "bot"; avatar: string; text: string; meta: string }[];
};

const DEMO_DATA: Record<"toy" | "enterprise" | "robot", DemoScenario> = {
  toy: {
    context: [
      { k: "profile:", v: "Mia, age 6" },
      { k: "curriculum:", v: "K1 phonics" },
      { k: "voice:", v: "parent_clone" },
      { k: "policy:", v: "child_safe" },
    ],
    msgs: [
      { role: "user", avatar: "M", text: "What sound does C make?", meta: "Mia · 14:32" },
      {
        role: "bot",
        avatar: "A",
        text: "C says /k/ — like in cat. Want to try one with me, sweetheart?",
        meta: "Voice: parent_clone · 14:32 · 280ms",
      },
    ],
  },
  enterprise: {
    context: [
      { k: "customer:", v: "Acme Corp Pro" },
      { k: "ticket:", v: "#4421 · billing" },
      { k: "kb_version:", v: "pricing v3.2" },
      { k: "policy:", v: "refund_auth" },
    ],
    msgs: [
      { role: "user", avatar: "C", text: "Why was I charged twice last month?", meta: "Customer · 09:14" },
      {
        role: "bot",
        avatar: "A",
        text: "I see two charges from May 4 and May 22. The second is a renewal — I can refund it now. Confirm?",
        meta: "Voice: support_clear · 09:14 · 240ms",
      },
    ],
  },
  robot: {
    context: [
      { k: "operator:", v: "authorized" },
      { k: "robot_id:", v: "arm_1" },
      { k: "state:", v: "idle" },
      { k: "env:", v: "shelf B-12" },
    ],
    msgs: [
      { role: "user", avatar: "O", text: "Pick up the box on shelf B-12.", meta: "Operator · 11:08" },
      {
        role: "bot",
        avatar: "A",
        text: "Moving to B-12. Picking up payload, estimated 8 seconds. Confirming when complete.",
        meta: "Voice: ops_neutral · 11:08 · 195ms",
      },
    ],
  },
};

const WAVEFORM_HEIGHTS = [
  40, 65, 85, 70, 50, 90, 75, 55, 80, 60, 95, 70, 45, 75, 88, 60, 50, 75, 90,
  65, 55, 80, 70, 50, 85, 60, 45, 70, 80, 65, 55, 75, 90, 60, 50,
];

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<"toy" | "enterprise" | "robot">("toy");
  const [playing, setPlaying] = useState(false);
  const playTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const data = DEMO_DATA[activeDemo];

  useEffect(() => {
    return () => {
      if (playTimer.current) clearTimeout(playTimer.current);
    };
  }, []);

  const handlePlay = () => {
    if (playing) {
      setPlaying(false);
      if (playTimer.current) clearTimeout(playTimer.current);
      return;
    }
    setPlaying(true);
    playTimer.current = setTimeout(() => setPlaying(false), 8000);
  };

  return (
    <>
      {/* Global design-system styles scoped to this landing page */}
      <style
        dangerouslySetInnerHTML={{
          __html: PAGE_CSS,
        }}
      />

      {/* NAV */}
      <nav className="axl-nav">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <span className="logo-mark">
              <Image
                src="/logo-old.png"
                alt="Axtora Labs"
                width={28}
                height={28}
                priority
              />
            </span>
            <span>Axtora Labs</span>
          </Link>
          <div className="nav-links">
            <Link href={LINKS.technology}>Technology</Link>
            <Link href={LINKS.patent}>Patent</Link>
            <Link href={LINKS.baseVirtuals}>BASE × Virtuals</Link>
            <Link href={LINKS.tokenomics}>Tokenomics</Link>
            <Link href={LINKS.voiceContribution}>Earn $AXTORA</Link>
            <Link href={LINKS.roadmap}>Roadmap</Link>
            <Link href="/tldr">TL;DR</Link>
            <Link href="/demo">Demo</Link>
          </div>
          <div className="nav-cta">
            <Link href={LINKS.whitepaper} className="btn btn-ghost">
              Whitepaper
            </Link>
            <Link href="/demo" className="btn btn-primary">
              Try the demo
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="hero-tag">
              <span className="hero-tag-pill">HK30101316</span>
              <span className="hero-tag-text">Granted patent · HKPC-backed</span>
            </div>
            <h1 className="display">
              Voice AI<br />
              that knows<br />
              <em>what to say.</em>
            </h1>
            <div className="hero-actions">
              <Link href="/demo" className="btn btn-primary btn-lg">
                Try the live demo
              </Link>
              <a href="#cta" className="btn btn-ghost btn-lg">
                Talk to our team
              </a>
            </div>
          </div>

          <div className="hero-meta">
            <div className="hero-meta-block">
              <span className="eyebrow">
                <span className="dot" />
                What we make
              </span>
              <p>
                Patented context-aware voice agents for toys, robots, and
                enterprise. Each conversation is grounded in a knowledge base
                you control — so it stays on-brand, age-appropriate, and
                accurate.
              </p>
            </div>
            <div className="hero-meta-block">
              <span className="eyebrow">Where you can hear it</span>
              <p>
                Live in the demo below. Three real deployment scenarios, three
                different voices, one pipeline underneath.
              </p>
            </div>
          </div>
        </div>

        {/* DEMO */}
        <div className="demo-shell" id="demo">
          <div className="demo-frame">
            <div className="demo-titlebar">
              <div className="demo-titlebar-dots">
                <div className="demo-titlebar-dot" />
                <div className="demo-titlebar-dot" />
                <div className="demo-titlebar-dot" />
              </div>
              <div className="demo-titlebar-label">
                axtora.studio · live demo
              </div>
              <div className="demo-titlebar-status">live</div>
            </div>
            <div className="demo-body">
              <div className="demo-sidebar">
                <div className="demo-sidebar-title">Scenarios</div>
                <button
                  className={`demo-tab${activeDemo === "toy" ? " active" : ""}`}
                  onClick={() => setActiveDemo("toy")}
                >
                  <svg
                    className="icon"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M8 2 L11 5 L11 9 L8 11 L5 9 L5 5 Z M8 11 L8 14" />
                  </svg>
                  Educational toy
                </button>
                <button
                  className={`demo-tab${activeDemo === "enterprise" ? " active" : ""}`}
                  onClick={() => setActiveDemo("enterprise")}
                >
                  <svg
                    className="icon"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <rect x={2} y={3} width={12} height={10} rx={1} />
                    <path d="M2 6 L14 6 M5 9 L11 9" />
                  </svg>
                  Enterprise agent
                </button>
                <button
                  className={`demo-tab${activeDemo === "robot" ? " active" : ""}`}
                  onClick={() => setActiveDemo("robot")}
                >
                  <svg
                    className="icon"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <rect x={4} y={4} width={8} height={8} rx={1} />
                    <circle cx={6.5} cy={7} r={0.8} fill="currentColor" />
                    <circle cx={9.5} cy={7} r={0.8} fill="currentColor" />
                    <path d="M8 1 L8 4 M2 8 L4 8 M12 8 L14 8" />
                  </svg>
                  Companion robot
                </button>
                <div className="demo-divider" />
                <div className="demo-sidebar-title">Context loaded</div>
                <div className="demo-context">
                  {data.context.map((c) => (
                    <div key={c.k}>
                      <span className="key">{c.k}</span>{" "}
                      <span className="val">{c.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="demo-main">
                <div className="demo-conversation">
                  {data.msgs.map((m, i) => (
                    <div key={i} className={`demo-msg ${m.role}`}>
                      <div className="demo-msg-avatar">{m.avatar}</div>
                      <div>
                        <div className="demo-msg-bubble">{m.text}</div>
                        <div className="demo-msg-meta">{m.meta}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="demo-controls">
                  <button
                    className="play-btn"
                    onClick={handlePlay}
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    {playing ? "❚❚" : "▶"}
                  </button>
                  <div className={`waveform${playing ? " playing" : ""}`}>
                    {WAVEFORM_HEIGHTS.map((h, i) => (
                      <div key={i} className="bar" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <span className="demo-time">0:08 · 16kHz · live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <div className="marquee">
        <div className="marquee-label">
          <span className="eyebrow">Built with · Backed by · Listed on</span>
        </div>
        <div className="marquee-track">
          {[...Array(2)].flatMap((_, outer) =>
            [
              ["BASE", "L2 · Coinbase"],
              ["Virtuals", "Protocol"],
              ["HKPC", "Productivity Council"],
              ["CNIPA", "Search Report"],
              ["HK Patent Office", "Granted"],
              ["PCT", "International"],
            ].map(([name, sub], i) => (
              <div className="marquee-item" key={`${outer}-${i}`}>
                {name} <small>{sub}</small>
              </div>
            ))
          )}
        </div>
      </div>

      {/* THREE DOORS */}
      <section>
        <div className="section-inner">
          <div className="section-head">
            <div>
              <span className="eyebrow">001 · Three deployments</span>
              <h2 className="display">
                One pipeline.
                <br />
                <em>Many surfaces.</em>
              </h2>
            </div>
            <div>
              <p className="lede">
                Toys for kids. Agents for enterprise. APIs for builders. The
                patent stack underneath is the same — what changes is the
                runtime, the policy layer, and the voice persona.
              </p>
            </div>
          </div>

          <div className="doors">
            <Link href={LINKS.technology} className="door">
              <div className="door-illustration door-illustration--toy">
                <svg width={160} height={140} viewBox="0 0 160 140" fill="none">
                  <defs>
                    <radialGradient id="toy-glow" cx="50%" cy="60%">
                      <stop offset="0%" stopColor="#ff6a1f" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#ff6a1f" stopOpacity={0} />
                    </radialGradient>
                  </defs>
                  <circle cx={80} cy={80} r={60} fill="url(#toy-glow)" />
                  <path
                    d="M80 110 C50 90 35 70 35 55 C35 40 47 30 60 30 C70 30 78 36 80 44 C82 36 90 30 100 30 C113 30 125 40 125 55 C125 70 110 90 80 110 Z"
                    fill="#1b1b22"
                    stroke="#ff6a1f"
                    strokeWidth={1.5}
                  />
                  <circle cx={68} cy={58} r={3} fill="#ff6a1f" />
                  <circle cx={92} cy={58} r={3} fill="#ff6a1f" />
                  <path
                    d="M70 72 Q80 80 90 72"
                    stroke="#ff6a1f"
                    strokeWidth={1.5}
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path d="M20 80 Q30 70 40 80" stroke="#ff6a1f" strokeWidth={1} fill="none" opacity={0.4} />
                  <path d="M120 80 Q130 70 140 80" stroke="#ff6a1f" strokeWidth={1} fill="none" opacity={0.4} />
                  <path d="M15 90 Q30 75 45 90" stroke="#ff6a1f" strokeWidth={1} fill="none" opacity={0.2} />
                  <path d="M115 90 Q130 75 145 90" stroke="#ff6a1f" strokeWidth={1} fill="none" opacity={0.2} />
                </svg>
              </div>
              <div className="door-content">
                <span className="eyebrow">For brands</span>
                <h3>Toys & EdTech</h3>
                <p>
                  Drop-in voice for educational toys, language tutors, and
                  learning companions. Parent-controlled context. NFC topic
                  tags. Voice persona cloning.
                </p>
                <ul>
                  <li>K-12 curriculum aligned</li>
                  <li>Hardware reference design</li>
                  <li>Family voice program</li>
                </ul>
              </div>
            </Link>

            <Link href={LINKS.technology} className="door">
              <div className="door-illustration door-illustration--enterprise">
                <svg width={200} height={140} viewBox="0 0 200 140" fill="none">
                  <rect x={20} y={30} width={160} height={80} rx={6} fill="#0a0a0c" stroke="rgba(255,255,255,0.14)" />
                  <rect x={30} y={42} width={40} height={6} rx={1} fill="#ff6a1f" opacity={0.6} />
                  <rect x={30} y={54} width={80} height={4} rx={1} fill="rgba(255,255,255,0.2)" />
                  <rect x={30} y={64} width={60} height={4} rx={1} fill="rgba(255,255,255,0.15)" />
                  <rect x={30} y={74} width={100} height={4} rx={1} fill="rgba(255,255,255,0.1)" />
                  <path
                    d="M30 96 L50 88 L70 92 L90 80 L110 84 L130 70 L150 78 L170 64"
                    stroke="#ff6a1f"
                    strokeWidth={1.5}
                    fill="none"
                  />
                  <circle cx={170} cy={64} r={3} fill="#ff6a1f" />
                  <rect x={140} y={36} width={28} height={20} rx={2} fill="#1b1b22" stroke="rgba(255,255,255,0.14)" />
                  <rect x={146} y={41} width={14} height={2} rx={1} fill="#5dd9a3" />
                  <rect x={146} y={47} width={10} height={2} rx={1} fill="rgba(255,255,255,0.3)" />
                </svg>
              </div>
              <div className="door-content">
                <span className="eyebrow">For business</span>
                <h3>Enterprise Agents</h3>
                <p>
                  Voice and chat agents grounded in your knowledge base.
                  Compliance-ready. Multi-language. Brand-safe before the model
                  ever speaks.
                </p>
                <ul>
                  <li>Customer support automation</li>
                  <li>Internal knowledge agents</li>
                  <li>SOC 2 / GDPR pipeline</li>
                </ul>
              </div>
            </Link>

            <Link href={LINKS.technology} className="door">
              <div className="door-illustration door-illustration--api">
                <svg width={240} height={140} viewBox="0 0 240 140" fill="none">
                  <rect x={20} y={20} width={200} height={100} rx={6} fill="#0e0e11" stroke="rgba(255,255,255,0.14)" />
                  <circle cx={32} cy={32} r={2.5} fill="#ff5f56" />
                  <circle cx={42} cy={32} r={2.5} fill="#ffbd2e" />
                  <circle cx={52} cy={32} r={2.5} fill="#27c93f" />
                  <text x={32} y={56} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="#c8a5ff">
                    import
                  </text>
                  <text x={65} y={56} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="rgba(255,255,255,0.7)">
                    {"{ Axtora }"}
                  </text>
                  <text x={32} y={70} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="rgba(255,255,255,0.5)">
                    const
                  </text>
                  <text x={60} y={70} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="#ff9d6b">
                    agent
                  </text>
                  <text x={92} y={70} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="rgba(255,255,255,0.7)">
                    {"= new Axtora({"}
                  </text>
                  <text x={40} y={84} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="#6ba8ff">
                    context:
                  </text>
                  <text x={82} y={84} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="#5dd9a3">
                    &quot;k12&quot;
                  </text>
                  <text x={40} y={98} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="#6ba8ff">
                    voice:
                  </text>
                  <text x={74} y={98} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="#5dd9a3">
                    &quot;clone&quot;
                  </text>
                  <text x={32} y={112} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="rgba(255,255,255,0.5)">
                    {"});"}
                  </text>
                </svg>
              </div>
              <div className="door-content">
                <span className="eyebrow">For developers</span>
                <h3>Axtora API</h3>
                <p>
                  Clean SDKs, low-latency endpoints, transparent pricing. Pay
                  per call in $AXTORA. License patented features per
                  deployment.
                </p>
                <ul>
                  <li>REST + WebSocket APIs</li>
                  <li>Python · JS · Swift · Kotlin</li>
                  <li>Token-gated licensing</li>
                </ul>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="pipeline-section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <span className="eyebrow">002 · The technology</span>
              <h2 className="display">
                Five stages.
                <br />
                <em>One closed loop.</em>
              </h2>
            </div>
            <div>
              <p className="lede">
                Standard chatbots send a prompt. Axtora sends a fully-resolved
                context object — voice, identity, policy, and state — bound
                together before the LLM ever runs.
              </p>
              <p className="lede">
                That binding logic is the patent. It&apos;s what makes the
                system safe for children and brand-safe for enterprise without
                per-deployment prompt engineering.
              </p>
            </div>
          </div>

          <div className="pipeline-stages">
            {[
              { n: "01 / VOICE IN", h: "ASR + Speaker ID", p: "Voice becomes a structured object: text + acoustic confidence + speaker embedding." },
              { n: "02 / CONTEXT", h: "Operator-keyed retrieval", p: "Speaker ID becomes the lookup key. Each operator gets their own scope." },
              { n: "03 / HUB", h: "Policy + state vector", p: "The patent's heart. Binds ASR, context, voice, environment, policy." },
              { n: "04 / PLANNER", h: "Embodied LLM", p: "Outputs a multimodal plan: action sequence + speech feedback string." },
              { n: "05 / VOICE OUT", h: "Identity-adapted TTS", p: "Real-time voice synthesis keyed to the operator's vocal parameters." },
            ].map((s) => (
              <div className="stage" key={s.n}>
                <div className="stage-num">{s.n}</div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href={LINKS.technology} className="btn btn-link">
              See the full architecture
            </Link>
          </div>
        </div>
      </section>

      {/* USE CASES — BENTO */}
      <section>
        <div className="section-inner">
          <div className="section-head">
            <div>
              <span className="eyebrow">003 · Where it ships</span>
              <h2 className="display">
                Same engine.
                <br />
                <em>Different bodies.</em>
              </h2>
            </div>
            <div>
              <p className="lede">
                The pipeline runs on a child&apos;s plush toy as easily as on
                an enterprise SaaS dashboard or a robotic arm. We design for
                that variance from day one.
              </p>
            </div>
          </div>

          <div className="bento">
            <div className="b1">
              <div>
                <span className="eyebrow" style={{ color: "var(--ember-bright)" }}>
                  Flagship · Live
                </span>
                <h3>HarmonyHeart Toy</h3>
                <p>
                  The patent&apos;s reference implementation. NFC
                  topic-switching, EduPulse capacitive buttons, parent-cloned
                  voice. Currently in pilot with HK manufacturing partners.
                </p>
              </div>
              <div className="bento-illus ph">
                <span className="ph-name">Lifestyle photo</span>
                <span className="ph-dim">820 × 200 · @2x</span>
                <span className="ph-asset">bento-flagship.jpg</span>
              </div>
            </div>
            <div className="b2">
              <span className="eyebrow">Enterprise</span>
              <h3>Voice agents</h3>
              <p>Customer support for retail, telecom, financial services.</p>
            </div>
            <div className="b3">
              <span className="eyebrow">Robotics</span>
              <h3>Embodied AI</h3>
              <p>Action plans + speech feedback in a single vector.</p>
            </div>
            <div className="b4">
              <span className="eyebrow" style={{ color: "var(--plum)" }}>
                Healthcare · Pilot 2027
              </span>
              <h3>Clinical-context voice</h3>
              <p>
                Medication reminders, patient education, emotional support —
                all grounded in approved clinical knowledge bases. Pilot
                launches Q1 2027.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PATENT FEATURE */}
      <section className="pipeline-section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <span className="eyebrow">004 · Defensible IP</span>
              <h2 className="display">
                The moat
                <br />
                <em>is the patent.</em>
              </h2>
            </div>
            <div>
              <p className="lede">
                Models commoditize quickly. Open-source LLMs catch up to closed
                ones every quarter. What stays defensible is the orchestration
                layer that binds context, identity, and policy — and that&apos;s
                what HK30101316 covers.
              </p>
            </div>
          </div>

          <div className="patent-feature">
            <div className="patent-feature-text">
              <h3>HK30101316 — granted, globally pending.</h3>
              <p>
                The patent covers the orchestration layer that binds speaker
                identification, retrieved context, and policy state into a
                single situational vector — fed to an embodied LLM that outputs
                both robotic action plans and identity-adapted speech in
                parallel.
              </p>
              <p style={{ fontSize: 13.5, color: "var(--ink-400)" }}>
                Validated by CNIPA prior-art search. 90% funded by HKPC grant
                program. Filed in 7 jurisdictions plus PCT International.
              </p>
              <Link href={LINKS.patent} className="btn btn-link" style={{ marginTop: 8 }}>
                Read the patent details
              </Link>
            </div>
            <div className="patent-feature-stats">
              {[
                { n: "7+", l: "Jurisdictions filed", s: "HK · US · CN · IN · EU · JP · KR · PCT" },
                { n: "90%", l: "HKPC grant funded", s: "Government vetted novelty" },
                { n: "0", l: "Influencing prior art", s: "CNIPA search report on file" },
              ].map((s) => (
                <div className="pstat" key={s.l}>
                  <div className="pstat-num">{s.n}</div>
                  <div className="pstat-text">
                    <div className="pstat-label">{s.l}</div>
                    <div className="pstat-sub">{s.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BASE × VIRTUALS */}
      <section>
        <div className="section-inner">
          <div className="thesis-block">
            <span className="eyebrow" style={{ display: "block", marginBottom: 32 }}>
              005 · Why BASE × Virtuals
            </span>
            <p className="thesis-quote">
              We didn&apos;t choose Virtuals for the launch.
              <br />
              We chose it for <em>the stack underneath.</em>
            </p>
            <Link href={LINKS.baseVirtuals} className="btn btn-link">
              Read the full thesis
            </Link>
          </div>

          <div className="thesis-grid">
            {[
              { e: "Native commerce", h: "Agents transacting with agents", p: "Virtuals' Agentic Commerce Protocol lets every Axtora agent buy, sell, license, and settle with every other agent on BASE — without custom integrations." },
              { e: "Tech primitives", h: "x402, agent identity, yield", p: "BASE provides the production-grade primitives we'd otherwise have to build ourselves. Lowest latency, lowest cost, Coinbase-grade reliability." },
              { e: "Right community", h: "AI-native, technical, builder-first", p: "Virtuals' user base evaluates projects on the technology, the patent, the architecture — not just the chart." },
              { e: "Distribution leverage", h: "Hardware partners on the inside", p: "Operating in the BASE × Virtuals ecosystem opens doors to AI-aligned hardware OEMs, robotics integrators, and edu manufacturers in HK, Shenzhen, Tokyo, Seoul." },
            ].map((t) => (
              <div className="thesis-item" key={t.h}>
                <span className="eyebrow">{t.e}</span>
                <h4>{t.h}</h4>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOKEN UTILITY */}
      <section className="pipeline-section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <span className="eyebrow">006 · $AXTORA token</span>
              <h2 className="display">
                A utility token,
                <br />
                <em>priced by usage.</em>
              </h2>
            </div>
            <div>
              <p className="lede">
                Hold to access. Stake to earn. Contribute to grow. Three
                concrete ways to interact — six total utilities documented on
                the tokenomics page.
              </p>
            </div>
          </div>

          <div className="util-row">
            <div className="util u-ember">
              <div className="util-icon">
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M3 10 A7 7 0 1 0 10 3 M3 10 L7 6 M3 10 L7 14" />
                </svg>
              </div>
              <h3>API payments + buyback</h3>
              <p>
                Every API call is paid in $AXTORA. A configurable share of
                revenue is automatically used to buy back tokens from the open
                market, daily, on-chain.
              </p>
              <span className="util-tag">30-50% to buyback</span>
            </div>
            <div className="util u-citrine">
              <div className="util-icon">
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M10 3 L13 8 L18 9 L14 13 L15 18 L10 16 L5 18 L6 13 L2 9 L7 8 Z" />
                </svg>
              </div>
              <h3>Staking tiers + revenue share</h3>
              <p>
                Bronze, Silver, Gold, Studio. Stake more, get free API
                credits, priority support, early model access, and a share of
                patent licensing revenue.
              </p>
              <span className="util-tag">4 tiers · monthly distribution</span>
            </div>
            <div className="util u-plum">
              <div className="util-icon">
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M6 4 Q6 2 8 2 L12 2 Q14 2 14 4 L14 11 Q14 13 12 13 L8 13 Q6 13 6 11 Z M10 13 L10 17 M7 17 L13 17" />
                </svg>
              </div>
              <h3>Voice contribution rewards</h3>
              <p>
                5% of token supply reserved for contributors. Earn $AXTORA by
                contributing voice samples, curriculum, or domain expertise.
                Plus ongoing royalties when work is licensed.
              </p>
              <span className="util-tag">5% supply reserved</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 56, flexWrap: "wrap" }}>
            <Link href={LINKS.tokenomics} className="btn btn-ghost">
              Full tokenomics
            </Link>
            <a href={LINKS.voiceContribution} className="btn btn-primary">
              Earn $AXTORA →
            </a>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section>
        <div className="section-inner">
          <div className="section-head">
            <div>
              <span className="eyebrow">007 · What we ship now</span>
              <h2 className="display">
                Q3 2026
                <br />
                <em>in flight.</em>
              </h2>
            </div>
            <div>
              <p className="lede">
                We update the public roadmap quarterly, only after milestones
                ship. No vaporware tiles, no decade-long predictions, no{" "}
                <em style={{ fontStyle: "italic" }}>&quot;soon™&quot;</em>.
              </p>
            </div>
          </div>

          <div className="roadmap-card">
            <div className="roadmap-titlebar">
              <div className="roadmap-titlebar-dots">
                <div className="roadmap-titlebar-dot" />
                <div className="roadmap-titlebar-dot" />
                <div className="roadmap-titlebar-dot" />
              </div>
              <div className="roadmap-titlebar-label">
                ~/axtora-labs $ status --quarter Q3-2026
              </div>
            </div>
            <div className="roadmap-body">
              <div className="roadmap-line">
                <span className="prompt">$</span>
                <span className="text">cat shipped.log</span>
              </div>
              <div className="roadmap-line">
                <span className="meta">[2026-05-18]</span>
                <span className="label-success">[shipped]</span>
                <span className="text">IAO launch on Virtuals</span>
              </div>
              <div className="roadmap-line">
                <span className="meta">[2026-05-22]</span>
                <span className="label-success">[shipped]</span>
                <span className="text">Whitepaper v1.0 published</span>
              </div>
              <div className="roadmap-line">
                <span className="meta">[2026-06-04]</span>
                <span className="label-success">[shipped]</span>
                <span className="text">axtoralabs.com live</span>
              </div>
              <div className="roadmap-line">
                <span className="prompt">$</span>
                <span className="text">cat in-progress.log</span>
              </div>
              <div className="roadmap-line">
                <span className="meta">[Q3-2026]</span>
                <span className="label-progress">[active]</span>
                <span className="text">API beta · 50 design partners</span>
              </div>
              <div className="roadmap-line">
                <span className="meta">[Q3-2026]</span>
                <span className="label-progress">[active]</span>
                <span className="text">HarmonyHeart Toy pilot · 1K units</span>
              </div>
              <div className="roadmap-line">
                <span className="meta">[Q3-2026]</span>
                <span className="label-progress">[active]</span>
                <span className="text">First commercial license signed</span>
              </div>
              <div className="roadmap-line">
                <span className="meta">[Q3-2026]</span>
                <span className="label-progress">[active]</span>
                <span className="text">x402 payment integration</span>
              </div>
              <div className="roadmap-line">
                <span className="meta">[Q3-2026]</span>
                <span className="label-progress">[active]</span>
                <span className="text">Staking contracts deployed</span>
              </div>
              <div className="roadmap-line">
                <span className="prompt">$</span>
                <span className="text">_</span>
                <span className="roadmap-cursor" />
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href={LINKS.roadmap} className="btn btn-link">
              See full roadmap through Q1 2027
            </Link>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="pipeline-section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <span className="eyebrow">008 · Team</span>
              <h2 className="display">
                Real names.
                <br />
                <em>Signed work.</em>
              </h2>
            </div>
            <div>
              <p className="lede">
                No anonymous founders. The patent is filed under our names, the
                HKPC grant is in our names, the LinkedIn profiles are real. If
                you want to do due diligence, you can.
              </p>
            </div>
          </div>

          <div className="team">
            {[
              { n: "[Founder Name]", r: "Founder · Patent Inventor", b: "[Years] in AI and voice technology. Previously at [company]. Led the original invention and patent prosecution." },
              { n: "[CTO Name]", r: "CTO · Architecture", b: "[Years] in ML infrastructure. Owns the voice-to-voice pipeline, model serving, and BASE integration stack." },
              { n: "[Counsel Name]", r: "IP Counsel", b: "Manages the global patent portfolio across HK, US, CN, EU, JP, KR, and PCT International filings." },
            ].map((m) => (
              <div className="team-member" key={m.n}>
                <div className="team-portrait">
                  <span>192×192</span>
                </div>
                <div className="team-name">{m.n}</div>
                <div className="team-role">{m.r}</div>
                <p className="team-bio">{m.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta" id="cta">
        <h2 className="display">
          Building voice AI?
          <br />
          <em>Let&apos;s talk.</em>
        </h2>
        <p>
          Whether you&apos;re shipping a toy, deploying an enterprise agent, or
          evaluating $AXTORA — we&apos;d love to hear from you.
        </p>
        <div className="cta-actions">
          <a href={LINKS.bookDemo} className="btn btn-primary btn-lg">
            Book a demo call
          </a>
          <Link href={LINKS.whitepaper} className="btn btn-ghost btn-lg">
            Read the whitepaper
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="axl-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-mark">
                  <Image src="/logo-old.png" alt="Axtora Labs" width={28} height={28} />
                </span>
                <span>Axtora Labs</span>
              </div>
              <p>
                Patented context-aware voice AI for the agentic era. Built on
                BASE, deployed via Virtuals.
              </p>
              <div className="meta">HK30101316 · HKPC-backed · 2026</div>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><Link href={LINKS.technology}>Technology</Link></li>
                <li><Link href={LINKS.patent}>Patent</Link></li>
                <li><a href={LINKS.bookDemo}>API & SDKs</a></li>
                <li><a href={LINKS.bookDemo}>Pricing</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Token</h4>
              <ul>
                <li><Link href={LINKS.tokenomics}>Tokenomics</Link></li>
                <li><a href={LINKS.voiceContribution}>Earn $AXTORA</a></li>
                <li><Link href={LINKS.baseVirtuals}>BASE × Virtuals</Link></li>
                <li><Link href={LINKS.tokenomics}>Buyback report</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link href={LINKS.roadmap}>Roadmap</Link></li>
                <li><a href={LINKS.contact}>About</a></li>
                <li><a href={LINKS.careers}>Careers</a></li>
                <li><a href={LINKS.contact}>Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><Link href={LINKS.whitepaper}>Whitepaper</Link></li>
                <li><Link href={LINKS.whitepaper}>Docs</Link></li>
                <li><a href={LINKS.press}>Press kit</a></li>
                <li><a href={LINKS.twitter} target="_blank" rel="noopener noreferrer">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© 2026 Axtora Labs · All rights reserved</div>
            <div>
              <a href={LINKS.twitter} target="_blank" rel="noopener noreferrer">X / Twitter</a>
              <a href={LINKS.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
              <a href={LINKS.discord} target="_blank" rel="noopener noreferrer">Discord</a>
              <a href={LINKS.contact}>Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Page CSS                                                            */
/* ------------------------------------------------------------------ */
const PAGE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg: #0a0a0c;
  --bg-elev-1: #0e0e11;
  --bg-elev-2: #131318;
  --bg-elev-3: #1b1b22;
  --line: rgba(255, 255, 255, 0.06);
  --line-strong: rgba(255, 255, 255, 0.14);
  --line-bright: rgba(255, 255, 255, 0.32);
  --ink-100: #fafaf7;
  --ink-200: #d4d4cc;
  --ink-300: #9a9a92;
  --ink-400: #6b6b62;
  --ink-500: #424239;
  --ember: #ff6a1f;
  --ember-bright: #ff9d6b;
  --ember-soft: rgba(255, 106, 31, 0.12);
  --ember-glow: rgba(255, 106, 31, 0.4);
  --plum: #c8a5ff;
  --plum-soft: rgba(200, 165, 255, 0.1);
  --citrine: #f5d96b;
  --citrine-soft: rgba(245, 217, 107, 0.1);
  --azure: #6ba8ff;
  --azure-soft: rgba(107, 168, 255, 0.1);
  --success: #5dd9a3;
  --serif: 'Instrument Serif', 'Times New Roman', serif;
  --sans: 'Inter', -apple-system, sans-serif;
  --mono: 'JetBrains Mono', 'SF Mono', monospace;
}

html { scroll-behavior: smooth; }
body {
  font-family: var(--sans);
  background: var(--bg);
  color: var(--ink-100);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  font-feature-settings: "ss01", "cv11";
  margin: 0;
}
a { color: inherit; text-decoration: none; }
::selection { background: var(--ember); color: var(--bg); }

body::before {
  content: '';
  position: fixed; inset: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.015) 1px, transparent 0);
  background-size: 4px 4px;
  pointer-events: none;
  z-index: 1;
  opacity: 0.6;
}

.display { font-family: var(--serif); font-weight: 400; letter-spacing: -0.04em; line-height: 0.95; }
.display em { font-style: italic; color: var(--ember); }
.eyebrow {
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  text-transform: uppercase; letter-spacing: 0.18em; color: var(--ink-300);
}
.eyebrow .dot {
  display: inline-block; width: 6px; height: 6px; border-radius: 50%;
  background: var(--ember); margin-right: 8px; vertical-align: 2px;
  box-shadow: 0 0 12px var(--ember-glow);
  animation: blink 2s ease-in-out infinite;
}
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
code, .mono { font-family: var(--mono); font-size: 0.9em; }

.axl-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 14px 0; }
.axl-nav::before {
  content: ''; position: absolute; inset: 0;
  background: rgba(10, 10, 12, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--line);
}
.nav-inner {
  position: relative; max-width: 1320px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
}
.logo { display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 16px; letter-spacing: -0.02em; }
.logo-mark {
  width: 28px; height: 28px; border-radius: 6px;
  display: grid; place-items: center; overflow: hidden;
  background: var(--bg-elev-3);
  box-shadow: 0 0 0 1px rgba(255, 106, 31, 0.4), 0 0 20px var(--ember-soft);
}
.logo-mark img { width: 100%; height: 100%; object-fit: contain; }
.logo span:last-child { color: var(--ink-100); }
.nav-links {
  display: flex; gap: 4px; background: var(--bg-elev-2);
  border: 1px solid var(--line); border-radius: 99px; padding: 4px;
}
.nav-links a { font-size: 13px; color: var(--ink-300); padding: 7px 14px; border-radius: 99px; transition: all 0.15s; }
.nav-links a:hover { color: var(--ink-100); background: var(--bg-elev-3); }
@media (max-width: 1100px) { .nav-links { display: none; } }
.nav-cta { display: flex; gap: 10px; align-items: center; }

.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 18px; font-size: 13.5px; font-weight: 500;
  border-radius: 8px; transition: all 0.15s;
  cursor: pointer; border: none; font-family: inherit; white-space: nowrap;
  letter-spacing: -0.005em;
}
.btn-primary { background: var(--ember); color: #1f0d04; box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 0 0 1px var(--ember); }
.btn-primary:hover { background: var(--ember-bright); transform: translateY(-1px); box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 0 1px var(--ember-bright), 0 8px 32px var(--ember-glow); }
.btn-ghost { background: transparent; color: var(--ink-100); border: 1px solid var(--line-strong); }
.btn-ghost:hover { border-color: var(--line-bright); background: rgba(255,255,255,0.03); }
.btn-link { background: transparent; color: var(--ink-200); padding: 8px 0; font-size: 14px; }
.btn-link:hover { color: var(--ember); }
.btn-link::after { content: '→'; margin-left: 4px; transition: transform 0.15s; display: inline-block; }
.btn-link:hover::after { transform: translateX(3px); }
.btn-lg { padding: 13px 22px; font-size: 14.5px; }

.hero { position: relative; padding: 160px 24px 0; max-width: 1320px; margin: 0 auto; z-index: 2; }
.hero::before {
  content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 100%; max-width: 1320px; height: 100%;
  background-image: linear-gradient(to right, var(--line) 1px, transparent 1px);
  background-size: 20% 100%; pointer-events: none; opacity: 0.5; z-index: -1;
}
.hero-grid { display: grid; grid-template-columns: 1fr 360px; gap: 80px; align-items: end; }
@media (max-width: 1000px) { .hero-grid { grid-template-columns: 1fr; gap: 48px; } }
.hero-tag {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 6px 12px 6px 6px; background: var(--bg-elev-2);
  border: 1px solid var(--line-strong); border-radius: 99px;
  font-size: 12px; margin-bottom: 32px;
}
.hero-tag-pill { background: var(--ember-soft); color: var(--ember-bright); padding: 3px 10px; border-radius: 99px; font-size: 11px; font-weight: 500; font-family: var(--mono); letter-spacing: 0.04em; }
.hero-tag-text { color: var(--ink-200); padding-right: 8px; }
.hero h1 { font-size: clamp(56px, 9vw, 128px); margin-bottom: 28px; }
.hero-meta { display: flex; flex-direction: column; gap: 32px; padding-bottom: 8px; }
.hero-meta-block .eyebrow { display: block; margin-bottom: 8px; }
.hero-meta-block p { font-size: 15px; color: var(--ink-200); line-height: 1.55; }
.hero-actions { display: flex; gap: 12px; margin-top: 40px; flex-wrap: wrap; }

.demo-shell { position: relative; margin: 80px auto 0; max-width: 1100px; z-index: 2; }
.demo-shell::before { content: ''; position: absolute; inset: -40px -80px; background: radial-gradient(ellipse at center, var(--ember-soft) 0%, transparent 60%); pointer-events: none; }
.demo-frame { position: relative; background: var(--bg-elev-2); border: 1px solid var(--line-strong); border-radius: 16px; overflow: hidden; box-shadow: 0 0 0 1px rgba(255,255,255,0.02) inset, 0 1px 0 rgba(255,255,255,0.05) inset, 0 32px 80px rgba(0,0,0,0.5); }
.demo-titlebar { display: flex; align-items: center; padding: 12px 16px; border-bottom: 1px solid var(--line); background: var(--bg-elev-1); gap: 12px; }
.demo-titlebar-dots { display: flex; gap: 6px; }
.demo-titlebar-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--bg-elev-3); border: 1px solid var(--line); }
.demo-titlebar-label { font-family: var(--mono); font-size: 11px; color: var(--ink-400); flex: 1; text-align: center; letter-spacing: 0.02em; }
.demo-titlebar-status { font-family: var(--mono); font-size: 11px; color: var(--success); }
.demo-titlebar-status::before { content: '●'; margin-right: 5px; animation: blink 1.5s infinite; }
.demo-body { display: grid; grid-template-columns: 280px 1fr; min-height: 360px; }
@media (max-width: 800px) { .demo-body { grid-template-columns: 1fr; } }
.demo-sidebar { border-right: 1px solid var(--line); padding: 18px; background: var(--bg-elev-1); }
.demo-sidebar-title { font-family: var(--mono); font-size: 11px; color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 14px; }
.demo-tab { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 6px; cursor: pointer; font-size: 13.5px; color: var(--ink-300); transition: all 0.12s; background: transparent; border: none; font-family: inherit; width: 100%; text-align: left; margin-bottom: 2px; }
.demo-tab:hover { color: var(--ink-100); background: var(--bg-elev-3); }
.demo-tab.active { background: var(--bg-elev-3); color: var(--ink-100); box-shadow: inset 2px 0 0 var(--ember); }
.demo-tab .icon { width: 16px; height: 16px; color: var(--ember); }
.demo-divider { height: 1px; background: var(--line); margin: 14px 0; }
.demo-context { font-family: var(--mono); font-size: 11.5px; color: var(--ink-300); line-height: 1.7; padding: 12px; background: var(--bg); border: 1px solid var(--line); border-radius: 6px; }
.demo-context .key { color: var(--plum); }
.demo-context .val { color: var(--ink-200); }
.demo-main { padding: 24px; display: flex; flex-direction: column; justify-content: space-between; gap: 20px; }
.demo-conversation { display: flex; flex-direction: column; gap: 14px; }
.demo-msg { display: flex; align-items: flex-start; gap: 10px; max-width: 90%; }
.demo-msg-avatar { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; display: grid; place-items: center; font-size: 11px; font-weight: 600; margin-top: 2px; }
.demo-msg.user { align-self: flex-end; flex-direction: row-reverse; }
.demo-msg.user .demo-msg-avatar { background: var(--bg-elev-3); color: var(--ink-200); }
.demo-msg.bot .demo-msg-avatar { background: var(--ember); color: var(--bg); }
.demo-msg-bubble { padding: 10px 14px; border-radius: 12px; font-size: 14px; line-height: 1.55; }
.demo-msg.user .demo-msg-bubble { background: var(--bg-elev-3); color: var(--ink-100); border-bottom-right-radius: 4px; }
.demo-msg.bot .demo-msg-bubble { background: var(--ember-soft); color: var(--ember-bright); border-bottom-left-radius: 4px; border: 1px solid rgba(255, 106, 31, 0.2); }
.demo-msg-meta { font-family: var(--mono); font-size: 10px; color: var(--ink-400); margin-top: 4px; }
.demo-controls { display: flex; align-items: center; gap: 14px; padding-top: 16px; border-top: 1px solid var(--line); }
.play-btn { width: 40px; height: 40px; border-radius: 50%; background: var(--ember); color: var(--bg); display: grid; place-items: center; cursor: pointer; border: none; font-size: 14px; transition: transform 0.15s; flex-shrink: 0; }
.play-btn:hover { transform: scale(1.06); }
.waveform { flex: 1; display: flex; align-items: center; gap: 2px; height: 28px; }
.waveform .bar { flex: 1; background: var(--ink-500); border-radius: 1px; transition: height 0.2s, background 0.2s; min-height: 2px; }
@keyframes wave-pulse { 0%, 100% { transform: scaleY(0.3); background: var(--ink-500); } 50% { transform: scaleY(1); background: var(--ember); } }
.waveform.playing .bar { animation: wave-pulse 1s ease-in-out infinite; }
.waveform.playing .bar:nth-child(2n) { animation-delay: 0.1s; }
.waveform.playing .bar:nth-child(3n) { animation-delay: 0.2s; }
.waveform.playing .bar:nth-child(5n) { animation-delay: 0.3s; }
.demo-time { font-family: var(--mono); font-size: 11px; color: var(--ink-400); }

.marquee { margin-top: 120px; padding: 32px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); overflow: hidden; position: relative; background: var(--bg-elev-1); }
.marquee-label { text-align: center; margin-bottom: 24px; }
.marquee-track { display: flex; gap: 80px; animation: scroll 40s linear infinite; width: max-content; }
@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.marquee-item { display: flex; align-items: baseline; gap: 8px; white-space: nowrap; font-size: 18px; font-weight: 600; color: var(--ink-200); letter-spacing: -0.02em; transition: color 0.15s; }
.marquee-item:hover { color: var(--ink-100); }
.marquee-item small { font-family: var(--mono); font-size: 11px; font-weight: 400; color: var(--ink-400); letter-spacing: 0.04em; }
.marquee::before, .marquee::after { content: ''; position: absolute; top: 0; bottom: 0; width: 120px; z-index: 2; pointer-events: none; }
.marquee::before { left: 0; background: linear-gradient(to right, var(--bg-elev-1), transparent); }
.marquee::after { right: 0; background: linear-gradient(to left, var(--bg-elev-1), transparent); }

section { position: relative; z-index: 2; padding: 140px 24px; }
.section-inner { max-width: 1320px; margin: 0 auto; }
.section-head { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: end; margin-bottom: 80px; }
@media (max-width: 900px) { .section-head { grid-template-columns: 1fr; gap: 24px; } }
.section-head h2 { font-family: var(--serif); font-weight: 400; font-size: clamp(40px, 5vw, 72px); letter-spacing: -0.03em; line-height: 0.95; color: var(--ink-100); }
.section-head h2 em { font-style: italic; color: var(--ember); }
.section-head .lede { font-size: 16px; color: var(--ink-200); line-height: 1.65; max-width: 540px; }
.section-head .eyebrow { display: block; margin-bottom: 16px; }
.section-head .lede + .lede { margin-top: 12px; color: var(--ink-300); font-size: 14px; }

.doors { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; }
@media (max-width: 900px) { .doors { grid-template-columns: 1fr; } }
.door { background: var(--bg-elev-1); padding: 32px; transition: all 0.25s; position: relative; cursor: pointer; display: flex; flex-direction: column; gap: 24px; min-height: 480px; }
.door:hover { background: var(--bg-elev-2); }
.door-illustration { height: 200px; border-radius: 10px; background: var(--bg); border: 1px solid var(--line); position: relative; overflow: hidden; display: grid; place-items: center; }
.door-illustration--toy { background: radial-gradient(circle at 50% 60%, rgba(255,106,31,0.15) 0%, transparent 50%), var(--bg); }
.door-illustration--enterprise { background: linear-gradient(var(--bg) 0%, var(--bg-elev-1) 100%); }
.door-illustration--api { background: var(--bg); }
.door-content { flex: 1; display: flex; flex-direction: column; }
.door .eyebrow { margin-bottom: 12px; }
.door h3 { font-family: var(--serif); font-size: 28px; font-weight: 400; letter-spacing: -0.02em; line-height: 1; margin-bottom: 12px; }
.door p { font-size: 14px; color: var(--ink-300); line-height: 1.6; margin-bottom: 20px; }
.door ul { list-style: none; margin-top: auto; padding-top: 16px; border-top: 1px solid var(--line); margin-left: 0; padding-left: 0; }
.door ul li { font-family: var(--mono); font-size: 11.5px; color: var(--ink-400); padding: 4px 0; text-transform: uppercase; letter-spacing: 0.06em; }
.door ul li::before { content: '+ '; color: var(--ember); }

.pipeline-section { background: var(--bg-elev-1); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.pipeline-stages { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; margin-bottom: 32px; }
@media (max-width: 900px) { .pipeline-stages { grid-template-columns: repeat(2, 1fr); } }
.stage { background: var(--bg-elev-2); padding: 24px 20px; position: relative; transition: background 0.2s; cursor: pointer; }
.stage:hover { background: var(--bg-elev-3); }
.stage-num { font-family: var(--mono); font-size: 11px; color: var(--ember); margin-bottom: 12px; letter-spacing: 0.05em; }
.stage h4 { font-size: 15px; font-weight: 500; margin-bottom: 8px; letter-spacing: -0.01em; }
.stage p { font-size: 12.5px; color: var(--ink-400); line-height: 1.5; }
.stage::after { content: '→'; position: absolute; right: -8px; top: 32px; color: var(--ember); background: var(--bg); padding: 0 4px; font-size: 12px; z-index: 1; }
.stage:last-child::after { display: none; }
@media (max-width: 900px) { .stage::after { display: none; } }

.bento { display: grid; grid-template-columns: 1.5fr 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 16px; min-height: 600px; }
@media (max-width: 900px) { .bento { grid-template-columns: 1fr; grid-template-rows: auto; min-height: 0; } }
.bento > * { background: var(--bg-elev-1); border: 1px solid var(--line); border-radius: 14px; padding: 28px; transition: all 0.2s; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; }
.bento > *:hover { border-color: var(--line-strong); }
.bento .b1 { grid-row: 1 / 3; grid-column: 1 / 2; background: radial-gradient(circle at 80% 80%, var(--ember-soft) 0%, transparent 50%), var(--bg-elev-1); min-height: 400px; }
.bento .b2 { grid-column: 2 / 3; grid-row: 1 / 2; }
.bento .b3 { grid-column: 3 / 4; grid-row: 1 / 2; }
.bento .b4 { grid-column: 2 / 4; grid-row: 2 / 3; background: linear-gradient(135deg, var(--bg-elev-1) 0%, var(--plum-soft) 100%); }
@media (max-width: 900px) { .bento .b1, .bento .b2, .bento .b3, .bento .b4 { grid-row: auto; grid-column: auto; min-height: 0; } }
.bento .eyebrow { margin-bottom: 12px; }
.bento h3 { font-family: var(--serif); font-size: 28px; font-weight: 400; letter-spacing: -0.02em; line-height: 1; margin-bottom: 12px; }
.bento .b1 h3 { font-size: 40px; }
.bento p { font-size: 14px; color: var(--ink-300); line-height: 1.6; }
.bento .b1 p { font-size: 15px; max-width: 360px; }
.bento-illus { margin-top: 20px; height: 100px; border-radius: 8px; background: var(--bg); border: 1px solid var(--line); position: relative; overflow: hidden; display: grid; place-items: center; }
.b1 .bento-illus { height: 200px; }

.patent-feature { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: var(--bg-elev-1); }
@media (max-width: 900px) { .patent-feature { grid-template-columns: 1fr; } }
.patent-feature-text { padding: 48px; }
.patent-feature-text h3 { font-family: var(--serif); font-size: 36px; font-weight: 400; letter-spacing: -0.02em; line-height: 1; margin-bottom: 20px; }
.patent-feature-text p { font-size: 15px; color: var(--ink-300); line-height: 1.7; margin-bottom: 24px; }
.patent-feature-stats { background: var(--bg); padding: 48px; border-left: 1px solid var(--line); display: flex; flex-direction: column; justify-content: center; gap: 32px; }
@media (max-width: 900px) { .patent-feature-stats { border-left: none; border-top: 1px solid var(--line); } }
.pstat { display: flex; align-items: baseline; gap: 16px; padding-bottom: 24px; border-bottom: 1px solid var(--line); }
.pstat:last-child { border-bottom: none; padding-bottom: 0; }
.pstat-num { font-family: var(--serif); font-size: 64px; color: var(--ember); line-height: 0.9; font-weight: 400; letter-spacing: -0.04em; }
.pstat-text { flex: 1; }
.pstat-label { font-size: 14px; font-weight: 500; color: var(--ink-100); margin-bottom: 4px; }
.pstat-sub { font-family: var(--mono); font-size: 11px; color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.08em; }

.thesis-block { text-align: center; max-width: 920px; margin: 0 auto; padding: 0 24px; }
.thesis-quote { font-family: var(--serif); font-size: clamp(32px, 4.5vw, 56px); line-height: 1.1; font-weight: 400; letter-spacing: -0.02em; margin-bottom: 48px; color: var(--ink-100); }
.thesis-quote em { font-style: italic; color: var(--ember); }
.thesis-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; text-align: left; margin-top: 64px; }
@media (max-width: 700px) { .thesis-grid { grid-template-columns: 1fr; } }
.thesis-item { padding: 24px; background: var(--bg-elev-1); border: 1px solid var(--line); border-radius: 12px; }
.thesis-item .eyebrow { display: block; margin-bottom: 12px; color: var(--azure); }
.thesis-item h4 { font-size: 17px; font-weight: 500; margin-bottom: 10px; letter-spacing: -0.01em; }
.thesis-item p { font-size: 13.5px; color: var(--ink-300); line-height: 1.65; }

.util-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
@media (max-width: 900px) { .util-row { grid-template-columns: 1fr; } }
.util { background: var(--bg-elev-1); border: 1px solid var(--line); border-radius: 14px; padding: 32px; position: relative; overflow: hidden; transition: all 0.2s; }
.util:hover { transform: translateY(-2px); border-color: var(--line-strong); }
.util::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; }
.util.u-ember::before { background: var(--ember); }
.util.u-citrine::before { background: var(--citrine); }
.util.u-plum::before { background: var(--plum); }
.util-icon { width: 40px; height: 40px; border-radius: 10px; margin-bottom: 24px; display: grid; place-items: center; }
.u-ember .util-icon { background: var(--ember-soft); color: var(--ember); }
.u-citrine .util-icon { background: var(--citrine-soft); color: var(--citrine); }
.u-plum .util-icon { background: var(--plum-soft); color: var(--plum); }
.util h3 { font-size: 18px; font-weight: 500; margin-bottom: 10px; letter-spacing: -0.01em; }
.util p { font-size: 13.5px; color: var(--ink-300); line-height: 1.65; margin-bottom: 20px; }
.util-tag { display: inline-block; font-family: var(--mono); font-size: 10.5px; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.08em; }
.u-ember .util-tag { background: var(--ember-soft); color: var(--ember-bright); }
.u-citrine .util-tag { background: var(--citrine-soft); color: var(--citrine); }
.u-plum .util-tag { background: var(--plum-soft); color: var(--plum); }

.roadmap-card { max-width: 760px; margin: 0 auto; background: var(--bg); border: 1px solid var(--line-strong); border-radius: 12px; overflow: hidden; box-shadow: 0 0 0 1px rgba(255,106,31,0.1) inset, 0 24px 64px rgba(0,0,0,0.4); }
.roadmap-titlebar { display: flex; align-items: center; padding: 12px 16px; background: var(--bg-elev-1); border-bottom: 1px solid var(--line); gap: 12px; }
.roadmap-titlebar-dots { display: flex; gap: 6px; }
.roadmap-titlebar-dot { width: 10px; height: 10px; border-radius: 50%; }
.roadmap-titlebar-dot:nth-child(1) { background: #ff5f56; }
.roadmap-titlebar-dot:nth-child(2) { background: #ffbd2e; }
.roadmap-titlebar-dot:nth-child(3) { background: #27c93f; }
.roadmap-titlebar-label { font-family: var(--mono); font-size: 11.5px; color: var(--ink-400); flex: 1; text-align: center; }
.roadmap-body { padding: 24px; font-family: var(--mono); font-size: 13px; line-height: 1.9; }
.roadmap-line { display: flex; gap: 12px; }
.roadmap-line .prompt { color: var(--success); flex-shrink: 0; }
.roadmap-line .text { color: var(--ink-100); }
.roadmap-line .meta { color: var(--ink-400); }
.roadmap-line .label-success { color: var(--success); }
.roadmap-line .label-progress { color: var(--ember); }
.roadmap-line .label-info { color: var(--azure); }
.roadmap-cursor { display: inline-block; width: 7px; height: 14px; background: var(--ember); margin-left: 4px; animation: blink-cursor 1s step-end infinite; vertical-align: -2px; }
@keyframes blink-cursor { 50% { opacity: 0; } }

.team { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
@media (max-width: 900px) { .team { grid-template-columns: 1fr; } }
.team-member { text-align: center; padding: 32px 24px; background: var(--bg-elev-1); border: 1px solid var(--line); border-radius: 14px; transition: all 0.2s; }
.team-member:hover { border-color: var(--line-strong); }
.team-portrait { width: 88px; height: 88px; border-radius: 50%; margin: 0 auto 20px; background: var(--bg-elev-3); border: 1px solid var(--line-strong); display: grid; place-items: center; color: var(--ink-400); font-family: var(--mono); font-size: 10px; overflow: hidden; position: relative; }
.team-portrait::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,106,31,0.06) 4px, rgba(255,106,31,0.06) 8px); }
.team-portrait span { position: relative; z-index: 1; }
.team-name { font-family: var(--serif); font-size: 24px; font-weight: 400; letter-spacing: -0.02em; margin-bottom: 4px; }
.team-role { font-family: var(--mono); font-size: 11px; color: var(--ember); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 14px; }
.team-bio { font-size: 13px; color: var(--ink-300); line-height: 1.65; }

.cta { margin: 0 24px 80px; padding: 80px 48px; border: 1px solid var(--line-strong); border-radius: 24px; text-align: center; background: radial-gradient(ellipse at top, var(--ember-soft) 0%, transparent 60%), var(--bg-elev-1); position: relative; overflow: hidden; max-width: 1320px; margin-left: auto; margin-right: auto; }
.cta::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(to right, transparent, var(--ember), transparent); }
.cta h2 { font-family: var(--serif); font-size: clamp(40px, 5vw, 64px); font-weight: 400; line-height: 1; letter-spacing: -0.025em; margin-bottom: 24px; }
.cta h2 em { font-style: italic; color: var(--ember); }
.cta p { font-size: 16px; color: var(--ink-200); max-width: 540px; margin: 0 auto 32px; line-height: 1.6; }
.cta-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

.axl-footer { border-top: 1px solid var(--line); padding: 64px 24px 40px; background: var(--bg-elev-1); position: relative; z-index: 2; }
.footer-inner { max-width: 1320px; margin: 0 auto; }
.footer-grid { display: grid; grid-template-columns: 2fr repeat(4, 1fr); gap: 48px; margin-bottom: 56px; padding-bottom: 56px; border-bottom: 1px solid var(--line); }
@media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; } }
.footer-brand p { font-size: 13px; color: var(--ink-300); line-height: 1.7; margin-top: 16px; max-width: 320px; }
.footer-brand .meta { font-family: var(--mono); font-size: 11px; color: var(--ink-400); margin-top: 16px; text-transform: uppercase; letter-spacing: 0.06em; }
.footer-col h4 { font-family: var(--mono); font-size: 11px; font-weight: 500; color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 20px; }
.footer-col ul { list-style: none; margin: 0; padding: 0; }
.footer-col li { margin-bottom: 12px; }
.footer-col a { font-size: 13.5px; color: var(--ink-200); transition: color 0.15s; }
.footer-col a:hover { color: var(--ember); }
.footer-bottom { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; font-family: var(--mono); font-size: 11px; color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.06em; }
.footer-bottom a { color: var(--ink-400); transition: color 0.15s; margin-left: 24px; }
.footer-bottom a:hover { color: var(--ink-100); }

.ph { position: relative; background: repeating-linear-gradient(45deg, transparent 0, transparent 8px, rgba(255,106,31,0.06) 8px, rgba(255,106,31,0.06) 9px), var(--bg); border: 1px dashed rgba(255, 106, 31, 0.3); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--ember-bright); overflow: hidden; }
.ph-name { font-family: var(--mono); font-size: 11px; font-weight: 500; letter-spacing: 0.04em; margin-bottom: 4px; text-transform: uppercase; }
.ph-dim { font-family: var(--mono); font-size: 10px; color: var(--ink-400); }
.ph-asset { position: absolute; bottom: 6px; right: 8px; font-family: var(--mono); font-size: 9px; color: var(--ink-500); letter-spacing: 0.04em; }

h1, h2, h3, h4, h5, h6, p { margin: 0; }
`;

