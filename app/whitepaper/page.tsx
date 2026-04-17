import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe, MessageCircle } from "lucide-react";

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-[#111419] text-white">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-[#111419]/80 backdrop-blur-sm">
        <div className="mx-auto flex h-20 w-full max-w-[1460px] items-center justify-between px-5 sm:px-6 lg:px-8 xl:px-10">
          <Link href="/V2" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111318]/55 ring-1 ring-[#FF6B00]/20 backdrop-blur-sm">
              <img
                src="/logo-old.png"
                alt="Axtora Labs"
                className="h-auto w-8"
              />
            </div>
            <div className="flex flex-col leading-none text-white">
              <span className="text-lg font-semibold tracking-[-0.035em] sm:text-[1.2rem]">
                Axtora Labs
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#FF6B00]">
                Whitepaper
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/V2" className="text-sm text-white/70 transition-colors hover:text-[#FFB27A]">
              Back to V2
            </Link>
            <Link
              href="https://x.com/axtoralabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#FFB27A] transition-colors hover:text-[#FF6B00]"
            >
              Follow @axtoralabs
            </Link>
          </nav>
        </div>
      </header>

      <article className="mx-auto w-full max-w-4xl px-5 py-24 sm:px-6 lg:px-8 xl:px-10">
        <div className="prose prose-invert prose-lg max-w-none">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Axtora Labs White Paper
            </h1>
            <h2 className="mb-6 text-2xl font-light text-[#FFB27A] sm:text-3xl">
              Patented Context-Aware Voice AI Tokenized on Virtuals Protocol
            </h2>
            <div className="flex flex-col items-center gap-2 text-sm text-white/60">
              <span>Version 1.0</span>
              <span>Published: April 2026</span>
            </div>
          </header>

          {/* Table of Contents */}
          <nav className="mb-16 rounded-xl border border-white/10 bg-[#1a1d29] p-6">
            <h3 className="mb-4 text-xl font-semibold text-white">Table of Contents</h3>
            <ol className="space-y-2 text-sm">
              <li><Link href="#executive-summary" className="text-[#FFB27A] hover:text-white">1. Executive Summary</Link></li>
              <li><Link href="#problem-statement" className="text-[#FFB27A] hover:text-white">2. Problem Statement</Link></li>
              <li><Link href="#our-solution" className="text-[#FFB27A] hover:text-white">3. Our Solution</Link></li>
              <li><Link href="#technology" className="text-[#FFB27A] hover:text-white">4. Technology</Link></li>
              <li><Link href="#patent-technical-architecture" className="text-[#FFB27A] hover:text-white">5. Patent Technical Architecture</Link></li>
              <li><Link href="#patent-portfolio" className="text-[#FFB27A] hover:text-white">6. Patent Portfolio</Link></li>
              <li><Link href="#market-opportunity" className="text-[#FFB27A] hover:text-white">7. Market Opportunity</Link></li>
              <li><Link href="#the-axtora-token" className="text-[#FFB27A] hover:text-white">8. The $AXTORA Token</Link></li>
              <li><Link href="#virtuals-protocol-integration" className="text-[#FFB27A] hover:text-white">9. Virtuals Protocol Integration</Link></li>
              <li><Link href="#roadmap" className="text-[#FFB27A] hover:text-white">10. Roadmap</Link></li>
              <li><Link href="#team" className="text-[#FFB27A] hover:text-white">11. Team</Link></li>
              <li><Link href="#conclusion" className="text-[#FFB27A] hover:text-white">12. Conclusion</Link></li>
            </ol>
          </nav>

          {/* Executive Summary */}
          <section id="executive-summary" className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-3xl font-bold text-white">Executive Summary</h2>
            <div className="space-y-4 text-lg leading-relaxed text-white/80">
              <p>
                Axtora Labs is pioneering the next generation of conversational AI through patented, context-aware voice-to-voice agent technology. Our innovative pipeline enables natural, safe, and contextually relevant conversations by integrating curated knowledge bases with advanced LLMs and voice synthesis.
              </p>
              <p>
                With a granted patent in Hong Kong (HK30101316) and pending applications across major jurisdictions, our technology is positioned to transform multiple industries including education, smart toys, companion robotics, healthcare, and enterprise solutions.
              </p>
              <p>
                The $AXTORA token, launching via Initial Agent Offering (IAO) on Virtuals Protocol on May 18, 2026, provides token holders with access to AI agent licensing, governance participation, revenue sharing, and priority access to new features.
              </p>
            </div>
          </section>

          {/* Problem Statement */}
          <section id="problem-statement" className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-3xl font-bold text-white">Problem Statement</h2>
            
            <h3 className="mb-4 text-2xl font-semibold text-[#FFB27A]">Current Limitations in Conversational AI</h3>
            
            <div className="space-y-6">
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">1. Lack of Context Awareness</h4>
                <p className="text-white/80">
                  Most AI chatbots and voice assistants operate without understanding the specific context or environment in which conversations occur. This leads to generic, often inappropriate responses.
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">2. Safety Concerns</h4>
                <p className="text-white/80">
                  Open-ended AI systems can generate harmful, biased, or factually incorrect information, especially when interacting with children or vulnerable populations.
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">3. Limited Personalization</h4>
                <p className="text-white/80">
                  Voice assistants lack the ability to maintain consistent personas or adapt to specific use cases and user demographics.
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">4. Knowledge Base Limitations</h4>
                <p className="text-white/80">
                  General-purpose LLMs have no mechanism to access curated, domain-specific knowledge controlled by administrators or parents.
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">5. High Development Costs</h4>
                <p className="text-white/80">
                  Building custom voice AI solutions requires significant investment in infrastructure, training, and integration.
                </p>
              </div>
            </div>
          </section>

          {/* Our Solution */}
          <section id="our-solution" className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-3xl font-bold text-white">Our Solution</h2>
            
            <p className="mb-8 text-lg text-white/80">
              Axtora Labs has developed a patented voice-to-voice AI pipeline that addresses these limitations through:
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-[#FF6B00]/20 p-2">
                    <Zap className="h-6 w-6 text-[#FF6B00]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Context-Aware Processing</h3>
                </div>
                <p className="text-white/80">
                  Our system retrieves relevant context from a curated database before generating responses, ensuring conversations are contextually appropriate and safe.
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-[#FF6B00]/20 p-2">
                    <Shield className="h-6 w-6 text-[#FF6B00]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Parent/Admin Control</h3>
                </div>
                <p className="text-white/80">
                  The context database is controlled and curated by administrators or parents, enabling safe, age-appropriate interactions.
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-[#FF6B00]/20 p-2">
                    <Globe className="h-6 w-6 text-[#FF6B00]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Trained Voice Personas</h3>
                </div>
                <p className="text-white/80">
                  Multiple voice profiles with distinct personalities can be applied, making interactions more engaging and suitable for different use cases.
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-[#FF6B00]/20 p-2">
                    <ArrowRight className="h-6 w-6 text-[#FF6B00]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Modular Architecture</h3>
                </div>
                <p className="text-white/80">
                  Our pipeline can be integrated into various hardware and software platforms, from educational toys to enterprise solutions.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-white/10 bg-[#1a1d29] p-6">
              <h3 className="mb-3 text-xl font-semibold text-white">Cost-Effective Licensing</h3>
              <p className="text-white/80">
                Token-based licensing model makes our technology accessible to businesses of all sizes.
              </p>
            </div>
          </section>

          {/* Technology */}
          <section id="technology" className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-3xl font-bold text-white">Technology</h2>
            
            <h3 className="mb-6 text-2xl font-semibold text-[#FFB27A]">The Voice-to-Voice Pipeline</h3>
            
            <p className="mb-6 text-lg text-white/80">
              Our patented technology (HK Patent HK30101316) consists of five key stages:
            </p>

            <div className="mb-8 rounded-lg border border-white/10 bg-[#1a1d29] p-6">
              <pre className="text-sm text-white/80">
{`[Voice Input] -> [Voice 2 Text] -> [Context Search] -> [Context Database] 
                                                   |
[Context + Query] -> [Large Language Model] -> [Text 2 Voice] -> [Voice Output]`}
              </pre>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">1. Voice 2 Text</h4>
                <p className="text-white/80">
                  Advanced speech recognition captures user intent and natural language queries with high accuracy across multiple languages and accents.
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">2. Context Search</h4>
                <p className="text-white/80">
                  Intelligent retrieval system identifies relevant context from the curated database based on the user's query, current situation, and conversation history.
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">3. Context Database</h4>
                <p className="text-white/80 mb-4">
                  A safe, appropriate knowledge base controlled by administrators or parents. This database can include:
                </p>
                <ul className="list-inside list-disc space-y-2 text-white/80">
                  <li>Educational content</li>
                  <li>Company-specific information</li>
                  <li>Product knowledge</li>
                  <li>Safety guidelines</li>
                  <li>Personal preferences</li>
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">4. Large Language Model</h4>
                <p className="text-white/80">
                  The AI processes both the retrieved context and user query to generate appropriate, contextually relevant responses. We leverage state-of-the-art LLMs optimized for our specific use cases.
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">5. Text 2 Voice</h4>
                <p className="text-white/80">
                  Natural voice synthesis with trained personas converts text responses back to natural speech, maintaining consistent character voices and emotional tones.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-2xl font-semibold text-[#FFB27A]">Technical Advantages</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#FF6B00]" />
                  <div>
                    <strong className="text-white">Low Latency:</strong>
                    <span className="ml-2 text-white/80">Optimized pipeline for real-time conversations</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#FF6B00]" />
                  <div>
                    <strong className="text-white">Multi-Language Support:</strong>
                    <span className="ml-2 text-white/80">Speech recognition and synthesis in multiple languages</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#FF6B00]" />
                  <div>
                    <strong className="text-white">Scalable Architecture:</strong>
                    <span className="ml-2 text-white/80">Cloud-based deployment with edge computing options</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#FF6B00]" />
                  <div>
                    <strong className="text-white">Privacy-First:</strong>
                    <span className="ml-2 text-white/80">Context databases remain under administrator control</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#FF6B00]" />
                  <div>
                    <strong className="text-white">Customizable:</strong>
                    <span className="ml-2 text-white/80">Voice personas and context databases can be tailored per deployment</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Patent Technical Architecture */}
          <section id="patent-technical-architecture" className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-3xl font-bold text-white">Patent Technical Architecture</h2>
            
            <div className="mb-8 text-lg text-white/80">
              <p>
                Based on a detailed analysis of the provided image, here is a highly technical explanation of the described system and its patented technology.
              </p>
            </div>

            <div className="mb-12 rounded-lg border border-white/10 bg-[#1a1d29] p-8">
              <h3 className="mb-6 text-2xl font-semibold text-[#FFB27A]">The Axtora Labs Multimodal Robotic Control Architecture</h3>
              
              <div className="mb-8">
                <img
                  src="/patent-diagram.png"
                  alt="Patent Technical Architecture Diagram"
                  className="w-full rounded-lg border border-white/10"
                />
              </div>

              <p className="mb-6 text-lg text-white/80">
                The technology stack illustrated represents a closed-loop, context-aware HMI (Human-Machine Interface) and robotic control system. The patent covers the novel orchestration and feedback loop that enables natural human-robot collaboration via an embodied Large Language Model (LLM). Unlike a typical chatbot, this system integrates high-level natural language understanding with low-level robotic manipulation and biometric personalization in real-time.
              </p>

              <p className="mb-8 text-lg text-white/80">
                The architecture is divided into three functional domains: <strong>Data Acquisition & Analysis (Ingress)</strong>, <strong>Cognitive Context Integration (Processing)</strong>, and <strong>Multimodal Action Orchestration (Egress)</strong>.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="mb-4 text-xl font-semibold text-white">Functional Domain 1: Data Acquisition & Analysis (Ingress)</h4>
                  <p className="mb-4 text-white/80">
                    This domain begins at the far left and includes the bottom-right and top-left subsystems. It is responsible for multi-sensor signal input, verification, and conversion into structured data.
                  </p>

                  <div className="space-y-6">
                    <div className="rounded-lg border border-white/5 bg-[#0f1117] p-6">
                      <h5 className="mb-3 text-lg font-semibold text-[#FFB27A]">1. HMI {'=>'} Voice to Text ASR Engine</h5>
                      <p className="mb-3 text-white/80">
                        <strong>Core Patent Point:</strong> The specific sequence and method of converting vocal signal inputs into a formatted, metadata-tagged text object, optimized for a robotic (non-conversational) control vector.
                      </p>
                      <p className="mb-3 text-white/80">
                        The Human Operator's vocalizations (speech commands) are captured by the HMI (Human-Machine Interface). The HMI passes the analog signal to the {"<strong>"}Automatic Speech Recognition (ASR) Engine{"</strong>"}.
                      </p>
                      <p className="text-white/80">
                        This ASR module utilizes a Deep Neural Network (DNN) for acoustic modeling to perform transcription. Critically, it does not output just text; it outputs a {"<strong>Voice to Text Object</strong>"}. This object contains the transcription, time stamps, and acoustic parameters like confidence scores for phonemes.
                      </p>
                    </div>

                    <div className="rounded-lg border border-white/5 bg-[#0f1117] p-6">
                      <h5 className="mb-3 text-lg font-semibold text-[#FFB27A]">2. Adaptive Speaker ID & Vocal Synthesis Parameter Injection (Personalization)</h5>
                      <p className="mb-3 text-white/80">
                        <strong>Core Patent Point:</strong> The patented method of using speaker identification (SID) as a key for database-driven personalization of the *entire* control and feedback loop.
                      </p>
                      <p className="mb-3 text-white/80">
                        This subsystem performs dual functions:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-white/80">
                        <li><strong>Voice Training (Speaker ID):</strong> It uses the input vocal signal to generate or match a unique speaker-profile embedding (e.g., d-vector). This confirms the operator's identity (e.g., ensuring authorization).</li>
                        <li><strong>Database Lookup:</strong> The speaker ID is used to query the {"<strong>Context Database</strong>"} for that operator's specific parameters, which are then passed to the ASR and LLM for customized processing.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 text-xl font-semibold text-white">Functional Domain 2: Cognitive Context Integration (Processing)</h4>
                  <p className="mb-4 text-white/80">
                    This domain, located at the center-right, is the cognitive heart of the patent. It moves beyond simple command-parsing to create a dynamic situational model.
                  </p>

                  <div className="space-y-6">
                    <div className="rounded-lg border border-white/5 bg-[#0f1117] p-6">
                      <h5 className="mb-3 text-lg font-semibold text-[#FFB27A]">3. Context Management & Policy Selector (The Context Hub)</h5>
                      <p className="mb-3 text-white/80">
                        <strong>Core Patent Point:</strong> The patented orchestration logic that binds the ASR output to dynamic, non-verbal system state data (vocal profile, robotic state, environmental selection) and pushes this consolidated "state vector" to the LLM.
                      </p>
                      <p className="mb-3 text-white/80">
                        This is the critical arbitration node. It simultaneously accepts inputs from multiple sources to synthesize a real-time system context:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-white/80">
                        <li>ASR Transcription output.</li>
                        <li>Personalized operator profile parameters (e.g., age, preference, permissions) from the Context Database.</li>
                        <li>The {"<strong>Context Selection Object</strong>"} from the operator's {"<strong>Context Selection HMI</strong>"} (e.g., confirming which robot or work cell is being commanded).</li>
                      </ul>
                      <p className="mb-3 text-white/80">
                        This consolidated data is pushed into the {"<strong>Context Management & Policy Selector</strong>"}, which performs semantic indexing and vector-space modeling on the incoming data. It synthesizes a high-level context object.
                      </p>
                    </div>

                    <div className="rounded-lg border border-white/5 bg-[#0f1117] p-6">
                      <h5 className="mb-3 text-lg font-semibold text-[#FFB27A]">4. Found Context {'=>'} LLM Ingestion (The Situational Vector)</h5>
                      <p className="mb-3 text-white/80">
                        This subsystem takes the high-level context object and prepares it for LLM digestion. It combines the operator's transcription with the surrounding system state (which robot is being used, who the operator is).
                      </p>
                      <p className="text-white/80">
                        It outputs a "situational vector" (e.g., a structured JSON or embedding vector) that encapsulates: <code className="rounded bg-[#1a1d29] px-2 py-1 text-sm">{'{Operator Command + Operator Profile + Robot ID + Environmental state + Policy constraints}'}</code>. This vector is fed into the LLM.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 text-xl font-semibold text-white">Functional Domain 3: Multimodal Action Orchestration (Egress)</h4>
                  <p className="mb-4 text-white/80">
                    This domain, spanning the center and bottom-left, translates cognitive decisions back into physical action and multimodal feedback.
                  </p>

                  <div className="space-y-6">
                    <div className="rounded-lg border border-white/5 bg-[#0f1117] p-6">
                      <h5 className="mb-3 text-lg font-semibold text-[#FFB27A]">5. Large Language Model (LLM) as a Planner</h5>
                      <p className="mb-3 text-white/80">
                        <strong>Core Patent Point:</strong> The novel application of an embodied LLM that doesn't generate conversational chat, but instead generates structured action plans and multimodal feedback vectors based on a patented state vector input.
                      </p>
                      <p className="mb-3 text-white/80">
                        The {"<strong>Large Language Model (LLM)</strong>"} receives the situational vector (e.g., <code className="rounded bg-[#1a1d29] px-2 py-1 text-sm">{'{command: "pick up the box on table A", operator: autorizado, robot_id: arm_1, state: idle}'}</code>).
                      </p>
                      <p className="mb-3 text-white/80">
                        Rather than a text chat, the LLM's output is a multimodal action plan vector, typically containing:
                      </p>
                      <ol className="list-inside list-decimal space-y-2 text-white/80">
                        <li><strong>Robot Command:</strong> A sequence of high-level control operations (e.g., path waypoints, inverse kinematics target, gripper command).</li>
                        <li><strong>Speech Feedback Plan:</strong> The optimized text string the robot should vocalize to confirm the action.</li>
                      </ol>
                    </div>

                    <div className="rounded-lg border border-white/5 bg-[#0f1117] p-6">
                      <h5 className="mb-3 text-lg font-semibold text-[#FFB27A]">6. Action Plan Branch (Robotic System Execution)</h5>
                      <p className="mb-3 text-white/80">
                        The action plan vector is sent directly to the commanded {"<strong>Generic Robotic System (End-Effector)</strong>"}.
                      </p>
                      <p className="text-white/80">
                        The robot's local controller decodes the high-level commands into joint-space trajectory targets and servo outputs, physically executing the intended task (e.g., picking up the box).
                      </p>
                    </div>

                    <div className="rounded-lg border border-white/5 bg-[#0f1117] p-6">
                      <h5 className="mb-3 text-lg font-semibold text-[#FFB27A]">7. Multimodal Feedback Branch (TTS & Personalization)</h5>
                      <p className="mb-3 text-white/80">
                        <strong>Core Patent Point:</strong> The novel method of real-time, identity-based Text-to-Speech (TTS) adaptation.
                      </p>
                      <p className="mb-3 text-white/80">
                        Simultaneously, the Speech Feedback Plan text is sent to the {"<strong>Neural Text-To-Speech (TTS) Engine</strong>"}.
                      </p>
                      <p className="mb-3 text-white/80">
                        Crucially, this TTS is *not generic*. It is concurrently fed with the user's specific {"<strong>Adaptive Speaker Profile</strong>"} parameters (e.g., d-vector, synthesis pitch, speed) that were retrieved at Domain 1.
                      </p>
                      <p className="text-white/80">
                        The TTS engine synthesizes the text output into an optimized analog audio signal, which is broadcast from the robot's {"<strong>Speaker Object</strong>"}. The robot vocalizes its confirmation using a voice pattern adapted *to* or *from* the specific operator.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-lg border border-[#FF6B00]/20 bg-[#FF6B00]/5 p-6">
                <h4 className="mb-4 text-xl font-semibold text-[#FFB27A]">Summary of Patented Innovation</h4>
                <p className="text-lg text-white/80">
                  The specific patented orchestration is the automated binding, indexing, and processing of the multimodal "state vector" that integrates ASR, SID-driven personalization, environment context, and policy constraints into a single input vector for an embodied LLM, which is then translated in parallel into optimized robotic actions and identity-adapted vocal feedback.
                </p>
              </div>
            </div>
          </section>

          {/* Patent Portfolio */}
          <section id="patent-portfolio" className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-3xl font-bold text-white">Patent Portfolio</h2>
            
            <h3 className="mb-6 text-2xl font-semibold text-[#FFB27A]">Granted Patents</h3>
            
            <div className="mb-8 rounded-lg border border-white/10 bg-[#1a1d29] p-6">
              <h4 className="mb-4 text-xl font-semibold text-white">Hong Kong Patent HK30101316</h4>
              <div className="grid gap-2 text-sm text-white/80">
                <div><strong>Granted:</strong> May 10, 2024</div>
                <div><strong>Priority Date:</strong> February 1, 2024</div>
                <div><strong>Status:</strong> Granted and enforceable</div>
              </div>
            </div>

            <h3 className="mb-6 text-2xl font-semibold text-[#FFB27A]">Pending Applications</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <strong className="text-white">USA:</strong> Patent application filed (pending)
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <strong className="text-white">India:</strong> Patent application filed (pending)
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <strong className="text-white">China:</strong> Patent application filed (2024800631123, pending)
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <strong className="text-white">PCT International:</strong> Patent application filed (pending)
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <strong className="text-white">Europe:</strong> Filing deadline July 2, 2026
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <strong className="text-white">Japan:</strong> Filing deadline July 2, 2026
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <strong className="text-white">Korea:</strong> Filing deadline July 2, 2026
              </div>
            </div>

            <h3 className="mb-6 mt-8 text-2xl font-semibold text-[#FFB27A]">Government Funding</h3>
            
            <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
              <p className="mb-4 text-white/80">
                The Hong Kong Productivity Council (HKPC) Patent Application Grant program provides 90% funding for our global patent expansion:
              </p>
              <div className="grid gap-2 text-sm text-white/80">
                <div><strong>Total Grant:</strong> HKD 150,000+ (~USD 19,200+)</div>
                <div><strong>Validation:</strong> Required positive patent search report confirming no similar technology exists worldwide</div>
                <div><strong>Significance:</strong> Government vetting validates the novelty and commercial merit of our innovation</div>
              </div>
            </div>
          </section>

          {/* Market Opportunity */}
          <section id="market-opportunity" className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-3xl font-bold text-white">Market Opportunity</h2>
            
            <h3 className="mb-6 text-2xl font-semibold text-[#FFB27A]">Total Addressable Market (TAM)</h3>
            
            <p className="mb-6 text-lg text-white/80">
              Our technology targets a combined market opportunity of <strong>$500B+</strong> across multiple sectors:
            </p>

            <div className="mb-8 overflow-x-auto rounded-lg border border-white/10 bg-[#1a1d29]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-white">Market Segment</th>
                    <th className="px-4 py-3 text-left text-white">Market Size</th>
                    <th className="px-4 py-3 text-left text-white">Year</th>
                    <th className="px-4 py-3 text-left text-white">Growth Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 text-white/80">Conversational AI</td>
                    <td className="px-4 py-3 text-white/80">$49.9B</td>
                    <td className="px-4 py-3 text-white/80">by 2030</td>
                    <td className="px-4 py-3 text-white/80">23.1% CAGR</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 text-white/80">EdTech</td>
                    <td className="px-4 py-3 text-white/80">$404B</td>
                    <td className="px-4 py-3 text-white/80">by 2025</td>
                    <td className="px-4 py-3 text-white/80">16.3% CAGR</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 text-white/80">Smart Toys</td>
                    <td className="px-4 py-3 text-white/80">$42.8B</td>
                    <td className="px-4 py-3 text-white/80">by 2028</td>
                    <td className="px-4 py-3 text-white/80">18.5% CAGR</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-white/80">Companion Robotics</td>
                    <td className="px-4 py-3 text-white/80">$34B</td>
                    <td className="px-4 py-3 text-white/80">by 2026</td>
                    <td className="px-4 py-3 text-white/80">22.4% CAGR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mb-6 text-2xl font-semibold text-[#FFB27A]">Use Cases</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="mb-4 text-xl font-semibold text-white">1. Educational Devices</h4>
                <ul className="list-inside list-disc space-y-2 text-white/80">
                  <li>Interactive learning companions for children</li>
                  <li>Language learning tools with native speaker voices</li>
                  <li>Homework assistance with curriculum-aligned content</li>
                  <li>Special education support with customizable content</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xl font-semibold text-white">2. Smart Toys</h4>
                <ul className="list-inside list-disc space-y-2 text-white/80">
                  <li>Conversational action figures and dolls</li>
                  <li>Educational games with voice interaction</li>
                  <li>Storytelling devices with character voices</li>
                  <li>Parent-controlled content libraries</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xl font-semibold text-white">3. Companion Robotics</h4>
                <ul className="list-inside list-disc space-y-2 text-white/80">
                  <li>Elderly care assistants with conversation capabilities</li>
                  <li>Therapy robots for mental health support</li>
                  <li>Home automation with natural voice interaction</li>
                  <li>Pet-like companions with personality</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xl font-semibold text-white">4. Healthcare</h4>
                <ul className="list-inside list-disc space-y-2 text-white/80">
                  <li>Patient education and medication reminders</li>
                  <li>Mental health support with therapeutic conversations</li>
                  <li>Caregiver assistance with context-aware information</li>
                  <li>Rehabilitation support with personalized content</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xl font-semibold text-white">5. Enterprise Solutions</h4>
                <ul className="list-inside list-disc space-y-2 text-white/80">
                  <li>Customer service with company-specific knowledge</li>
                  <li>Employee training with role-based context</li>
                  <li>Sales assistance with product information</li>
                  <li>Internal knowledge base access</li>
                </ul>
              </div>
            </div>

            <h3 className="mb-6 mt-8 text-2xl font-semibold text-[#FFB27A]">Competitive Advantages</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                  <strong className="text-white">Patented Technology</strong>
                </div>
                <p className="text-sm text-white/80">Legal protection against imitation</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                  <strong className="text-white">Context Awareness</strong>
                </div>
                <p className="text-sm text-white/80">Unique capability not found in competitors</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                  <strong className="text-white">Safety Controls</strong>
                </div>
                <p className="text-sm text-white/80">Parent/admin oversight for vulnerable users</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                  <strong className="text-white">Token Economics</strong>
                </div>
                <p className="text-sm text-white/80">Innovative licensing model via blockchain</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                  <strong className="text-white">Government-Backed</strong>
                </div>
                <p className="text-sm text-white/80">Validated innovation through HKPC grant</p>
              </div>
            </div>
          </section>

          {/* Token Section */}
          <section id="the-axtora-token" className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-3xl font-bold text-white">The $AXTORA Token</h2>
            
            <h3 className="mb-6 text-2xl font-semibold text-[#FFB27A]">Token Overview</h3>
            
            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <div className="text-sm text-white/60">Symbol</div>
                <div className="text-lg font-semibold text-white">$AXTORA</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <div className="text-sm text-white/60">Platform</div>
                <div className="text-lg font-semibold text-white">Virtuals Protocol</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <div className="text-sm text-white/60">Type</div>
                <div className="text-lg font-semibold text-white">AI Agent Token</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <div className="text-sm text-white/60">Launch</div>
                <div className="text-lg font-semibold text-white">May 18, 2026</div>
              </div>
            </div>

            <h3 className="mb-6 text-2xl font-semibold text-[#FFB27A]">Token Utility</h3>
            
            <div className="space-y-6">
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">1. Licensing Access</h4>
                <p className="mb-4 text-white/80">
                  $AXTORA tokens are required to license Axora Labs' AI technology for commercial deployments. The token-based model ensures:
                </p>
                <ul className="list-inside list-disc space-y-2 text-white/80">
                  <li>Transparent pricing</li>
                  <li>Easy integration</li>
                  <li>Global accessibility</li>
                  <li>Anti-counterfeiting protection</li>
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">2. Governance Participation</h4>
                <p className="mb-4 text-white/80">Token holders can vote on:</p>
                <ul className="list-inside list-disc space-y-2 text-white/80">
                  <li>Feature development priorities</li>
                  <li>Patent portfolio expansion decisions</li>
                  <li>Partnership opportunities</li>
                  <li>Protocol upgrades</li>
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">3. Revenue Sharing</h4>
                <p className="mb-4 text-white/80">A portion of licensing revenue is distributed to token holders:</p>
                <ul className="list-inside list-disc space-y-2 text-white/80">
                  <li>Revenue from commercial deployments</li>
                  <li>Royalties from patent licensing</li>
                  <li>Service fees from API access</li>
                  <li>Premium feature subscriptions</li>
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">4. Priority Access</h4>
                <p className="mb-4 text-white/80">Token holders receive:</p>
                <ul className="list-inside list-disc space-y-2 text-white/80">
                  <li>Early access to new features</li>
                  <li>Priority support</li>
                  <li>Beta program participation</li>
                  <li>Exclusive content and updates</li>
                </ul>
              </div>
            </div>

            <h3 className="mb-6 text-2xl font-semibold text-[#FFB27A]">Token Distribution</h3>
            
            <div className="mb-8 overflow-x-auto rounded-lg border border-white/10 bg-[#1a1d29]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-white">Allocation</th>
                    <th className="px-4 py-3 text-left text-white">Percentage</th>
                    <th className="px-4 py-3 text-left text-white">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 text-white/80">IAO Public Sale</td>
                    <td className="px-4 py-3 text-white/80">40%</td>
                    <td className="px-4 py-3 text-white/80">Fair launch on Virtuals Protocol</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 text-white/80">Team & Advisors</td>
                    <td className="px-4 py-3 text-white/80">20%</td>
                    <td className="px-4 py-3 text-white/80">2-year vesting, 6-month cliff</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 text-white/80">Development Fund</td>
                    <td className="px-4 py-3 text-white/80">15%</td>
                    <td className="px-4 py-3 text-white/80">R&D, patents, infrastructure</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 text-white/80">Marketing & Community</td>
                    <td className="px-4 py-3 text-white/80">15%</td>
                    <td className="px-4 py-3 text-white/80">Growth, partnerships, incentives</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-white/80">Reserve</td>
                    <td className="px-4 py-3 text-white/80">10%</td>
                    <td className="px-4 py-3 text-white/80">Future opportunities, treasury</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mb-6 text-2xl font-semibold text-[#FFB27A]">Initial Agent Offering (IAO)</h3>
            
            <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
              <div className="mb-4 grid gap-2 text-sm text-white/80">
                <div><strong>Launch Date:</strong> May 18, 2026</div>
                <div><strong>Platform:</strong> Virtuals Protocol</div>
                <div><strong>Access:</strong> Open to all participants - no whitelist required</div>
              </div>
              
              <h4 className="mb-3 text-lg font-semibold text-white">Participation Requirements:</h4>
              <ul className="list-inside list-disc space-y-2 text-white/80">
                <li>Web3 wallet compatible with Virtuals Protocol</li>
                <li>$VIRTUAL tokens for participation</li>
                <li>No prior registration needed</li>
              </ul>
            </div>
          </section>

          {/* Virtuals Protocol Integration */}
          <section id="virtuals-protocol-integration" className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-3xl font-bold text-white">Virtuals Protocol Integration</h2>
            
            <h3 className="mb-6 text-2xl font-semibold text-[#FFB27A]">Why Virtuals Protocol?</h3>
            
            <p className="mb-6 text-lg text-white/80">
              Axtora Labs chose Virtuals Protocol for the $AXTORA IAO because:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-[#FF6B00]" />
                <div>
                  <strong className="text-white">AI Agent Focus:</strong>
                  <span className="ml-2 text-white/80">Platform specifically designed for AI agent tokenization</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-[#FF6B00]" />
                <div>
                  <strong className="text-white">Proven Track Record:</strong>
                  <span className="ml-2 text-white/80">Successful launches of multiple AI agent projects</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-[#FF6B00]" />
                <div>
                  <strong className="text-white">Liquidity:</strong>
                  <span className="ml-2 text-white/80">Deep liquidity for AI agent tokens</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-[#FF6B00]" />
                <div>
                  <strong className="text-white">Community:</strong>
                  <span className="ml-2 text-white/80">Strong, engaged community interested in AI</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-[#FF6B00]" />
                <div>
                  <strong className="text-white">Infrastructure:</strong>
                  <span className="ml-2 text-white/80">Robust platform with excellent developer support</span>
                </div>
              </div>
            </div>

            <h3 className="mb-6 mt-8 text-2xl font-semibold text-[#FFB27A]">Integration Benefits</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <h4 className="mb-2 font-semibold text-white">Seamless Tokenization</h4>
                <p className="text-sm text-white/80">Native support for AI agent tokens</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <h4 className="mb-2 font-semibold text-white">Liquidity Pool</h4>
                <p className="text-sm text-white/80">Automatic DEX integration for trading</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <h4 className="mb-2 font-semibold text-white">Staking Mechanisms</h4>
                <p className="text-sm text-white/80">Built-in staking for token holders</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <h4 className="mb-2 font-semibold text-white">Governance Tools</h4>
                <p className="text-sm text-white/80">Integrated voting and governance systems</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4 md:col-span-2">
                <h4 className="mb-2 font-semibold text-white">Cross-Chain Compatibility</h4>
                <p className="text-sm text-white/80">Multi-chain support for broader access</p>
              </div>
            </div>

            <h3 className="mb-6 mt-8 text-2xl font-semibold text-[#FFB27A]">Participation Guide</h3>
            
            <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
              <ol className="list-inside list-decimal space-y-2 text-white/80">
                <li>Visit <a href="https://app.virtuals.io" className="text-[#FFB27A] hover:text-white">app.virtuals.io</a></li>
                <li>Connect your Web3 wallet</li>
                <li>Ensure you have $VIRTUAL tokens</li>
                <li>Navigate to the $AXTORA IAO</li>
                <li>Participate with your desired amount</li>
              </ol>
            </div>
          </section>

          {/* Roadmap */}
          <section id="roadmap" className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-3xl font-bold text-white">Roadmap</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-[#FFB27A]">2026</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-white">Q2</h4>
                    <ul className="list-inside list-disc space-y-2 text-white/80">
                      <li>IAO launch on Virtuals Protocol (May 18)</li>
                      <li>Token listing on DEX</li>
                      <li>Community building and marketing</li>
                      <li>Whitepaper v1.0 release</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-white">Q3</h4>
                    <ul className="list-inside list-disc space-y-2 text-white/80">
                      <li>Beta program for early adopters</li>
                      <li>First commercial licensing agreements</li>
                      <li>Patent filings in Europe, Japan, Korea</li>
                      <li>Mobile app development</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-white">Q4</h4>
                    <ul className="list-inside list-disc space-y-2 text-white/80">
                      <li>Full commercial launch of licensing platform</li>
                      <li>API access for developers</li>
                      <li>First hardware integrations</li>
                      <li>Staking mechanism implementation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-2xl font-semibold text-[#FFB27A]">2027</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-white">Q1</h4>
                    <ul className="list-inside list-disc space-y-2 text-white/80">
                      <li>Expansion to additional blockchains</li>
                      <li>Advanced voice persona library</li>
                      <li>Enterprise partnership announcements</li>
                      <li>Second whitepaper iteration</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-white">Q2</h4>
                    <ul className="list-inside list-disc space-y-2 text-white/80">
                      <li>AI agent marketplace launch</li>
                      <li>SDK for third-party developers</li>
                      <li>Educational toy partnerships</li>
                      <li>Healthcare pilot programs</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-white">Q3-Q4</h4>
                    <ul className="list-inside list-disc space-y-2 text-white/80">
                      <li>Global patent portfolio completion</li>
                      <li>Additional language support</li>
                      <li>Robotics integrations</li>
                      <li>Revenue sharing distribution begins</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team */}
          <section id="team" className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-3xl font-bold text-white">Team</h2>
            
            <h3 className="mb-6 text-2xl font-semibold text-[#FFB27A]">Leadership</h3>
            
            <div className="space-y-6">
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">Founder & CEO</h4>
                <ul className="list-inside list-disc space-y-2 text-white/80">
                  <li>Visionary leader with experience in AI and blockchain</li>
                  <li>Expertise in voice technology and natural language processing</li>
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">CTO</h4>
                <ul className="list-inside list-disc space-y-2 text-white/80">
                  <li>Technical architect with background in machine learning</li>
                  <li>Experience in scalable cloud infrastructure</li>
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-6">
                <h4 className="mb-3 text-xl font-semibold text-white">Patent Counsel</h4>
                <ul className="list-inside list-disc space-y-2 text-white/80">
                  <li>Intellectual property specialist</li>
                  <li>Expert in global patent strategy</li>
                </ul>
              </div>
            </div>

            <h3 className="mb-6 mt-8 text-2xl font-semibold text-[#FFB27A]">Advisors</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <h4 className="mb-2 font-semibold text-white">AI/ML Experts</h4>
                <p className="text-sm text-white/80">Advisors from leading AI research institutions</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <h4 className="mb-2 font-semibold text-white">Blockchain Specialists</h4>
                <p className="text-sm text-white/80">Experienced DeFi and protocol developers</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <h4 className="mb-2 font-semibold text-white">Industry Veterans</h4>
                <p className="text-sm text-white/80">Experts from education, toy, and robotics industries</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#1a1d29] p-4">
                <h4 className="mb-2 font-semibold text-white">Legal Counsel</h4>
                <p className="text-sm text-white/80">Corporate and regulatory compliance experts</p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-3xl font-bold text-white">Conclusion</h2>
            
            <div className="space-y-4 text-lg leading-relaxed text-white/80">
              <p>
                Axtora Labs represents a unique opportunity at the intersection of patented AI technology and blockchain tokenization. Our context-aware voice-to-voice AI pipeline addresses critical limitations in current conversational AI solutions, while the $AXTORA token provides innovative access to this technology.
              </p>
              <p>
                With a granted patent, pending applications across major jurisdictions, government-backed funding, and a $500B+ market opportunity, Axtora Labs is positioned for significant growth.
              </p>
              <p>
                The IAO launch on Virtuals Protocol on May 18, 2026, offers fair and open access to all participants, enabling broad community involvement in the future of conversational AI.
              </p>
              <p className="text-xl font-semibold text-[#FFB27A]">
                Join us in building the future of safe, context-aware voice AI.
              </p>
            </div>
          </section>

          {/* Contact & Social Media */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-white">Contact & Social Media</h2>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="https://x.com/axtoralabs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#1a1d29] px-4 py-3 text-white transition-colors hover:border-[#FF6B00] hover:bg-[#FF6B00]/10"
              >
                <MessageCircle className="h-5 w-5" />
                <span>@axtoralabs</span>
              </a>
              <a
                href="https://t.me/axtoralabs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#1a1d29] px-4 py-3 text-white transition-colors hover:border-[#FF6B00] hover:bg-[#FF6B00]/10"
              >
                <MessageCircle className="h-5 w-5" />
                <span>@axtoralabs</span>
              </a>
              <a
                href="https://discord.gg/axtoralabs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#1a1d29] px-4 py-3 text-white transition-colors hover:border-[#FF6B00] hover:bg-[#FF6B00]/10"
              >
                <MessageCircle className="h-5 w-5" />
                <span>axtoralabs</span>
              </a>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-8 rounded-lg border border-red-500/20 bg-red-500/5 p-6">
            <h2 className="mb-4 text-xl font-semibold text-red-400">Disclaimer</h2>
            <p className="text-sm text-white/80">
              This whitepaper is for informational purposes only and does not constitute financial advice. Participation in the IAO involves risk, and individuals should conduct their own research before making any investment decisions. The $AXTORA token is a utility token and not a security.
            </p>
            <p className="mt-2 text-xs text-white/60">
              © 2026 Axtora Labs. All rights reserved.
            </p>
          </section>
        </div>
      </article>

      <footer className="relative z-20 border-t border-white/10 bg-[#111419]">
        <div className="mx-auto flex w-full max-w-[1460px] flex-col gap-3 px-5 py-5 text-center sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 xl:px-10 lg:text-left">
          <div>
            <p className="text-sm font-medium tracking-[-0.02em] text-white/82">
              Axtora Labs
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#FFB27A]/80">
              Context-aware conversational AI, tokenized for the future.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center lg:justify-end">
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
              Patent No. HK30101316
            </span>
            <Link
              href="https://x.com/axtoralabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#FFB27A] transition-colors hover:text-[#FF6B00]"
            >
              @axtoralabs
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
