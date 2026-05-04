"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";

/**
 * Axtora Labs — TL;DR project doc.
 *
 * Designed to map onto the Virtuals Protocol "project details" page format
 * (e.g. https://app.virtuals.io/virtuals/72059) so it can be lifted
 * almost section-for-section onto the live listing.
 *
 * Source material: axtora-labs-website/public/whitepaper.md (April 2026,
 * v1.0). The GTM section is new and clearly flagged for internal review.
 */

const TOC = [
  { id: "snapshot", label: "1 · Snapshot" },
  { id: "what-it-is", label: "2 · What Axtora is" },
  { id: "problem", label: "3 · The problem" },
  { id: "solution", label: "4 · Our solution" },
  { id: "technology", label: "5 · Technology" },
  { id: "patents", label: "6 · Patents" },
  { id: "market", label: "7 · Market" },
  { id: "use-cases", label: "8 · Use cases" },
  { id: "token", label: "9 · $AXTORA token" },
  { id: "iao", label: "10 · IAO details" },
  { id: "virtuals", label: "11 · Virtuals integration" },
  { id: "gtm", label: "12 · Go-to-market" },
  { id: "roadmap", label: "13 · Roadmap" },
  { id: "team", label: "14 · Team" },
  { id: "risks", label: "15 · Risks & disclosure" },
  { id: "links", label: "16 · Links" },
];

export default function TldrPage() {
  return (
    <div
      className="flex flex-col min-h-screen w-full text-white"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(255,107,0,0.10), transparent 28%)," +
          "radial-gradient(circle at bottom right, rgba(255,107,0,0.06), transparent 24%)," +
          "linear-gradient(180deg, #16191d 0%, #1C1C22 35%, #17191f 100%)",
      }}
    >
      {/* Top bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[#FF6B00]/15 bg-[#1C1C22]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#FF6B00] transition-opacity hover:opacity-80"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to landing</span>
          </Link>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111318] ring-1 ring-[#FF6B00]/25">
              <Image
                src="/logo-old.png"
                alt="Axtora Labs"
                width={28}
                height={28}
                className="h-6 w-auto"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-base font-semibold tracking-tight">
                Axtora Labs
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#FF6B00]">
                Project TL;DR
              </span>
            </span>
          </Link>
          <div className="hidden text-right text-xs text-white/55 sm:block">
            <span className="block">Patent · HK30101316</span>
            <span className="block text-[#FF6B00]">v1.0 · April 2026</span>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FF6B00]">
                On this page
              </p>
              <nav className="flex flex-col gap-1.5 text-sm">
                {TOC.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="text-white/55 transition-colors hover:text-[#FF6B00]"
                  >
                    {t.label}
                  </a>
                ))}
              </nav>
              <div className="mt-8 rounded-xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#FFB27A]">
                  Internal note
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  This page is the source-of-truth project doc for the Virtuals
                  Protocol listing and internal review. Suggest edits in the
                  <span className="text-[#FF6B00]"> #axtora-launch </span>
                  channel.
                </p>
              </div>
            </div>
          </aside>

          <article className="min-w-0">
            {/* Hero */}
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#FFB27A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                Axtora Labs · Project Brief · v1.0
              </span>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Patented context-aware voice AI,{" "}
                <span className="text-[#FF6B00]">tokenized on Virtuals.</span>
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/70">
                A skim-friendly, copy-paste-ready brief covering everything
                Axtora — what we make, why it matters, the technology, the
                patents, the token, the go-to-market plan, and the roadmap.
                Designed for the Virtuals Protocol project page and for
                internal review and feedback.
              </p>
            </div>

            {/* 1. Snapshot */}
            <Section id="snapshot" title="1 · Snapshot">
              <div className="grid gap-3 sm:grid-cols-2">
                <Stat label="Project" value="Axtora Labs" />
                <Stat label="Token" value="$AXTORA" />
                <Stat label="Network" value="Virtuals Protocol (Base)" />
                <Stat label="IAO Launch" value="May 18, 2026" />
                <Stat label="Granted Patent" value="HK30101316 (Hong Kong)" />
                <Stat
                  label="Pending Patents"
                  value="USA, India, China, PCT (EU/JP/KR by Jul 2026)"
                />
                <Stat label="Government Funding" value="HKPC grant (~USD 19.2k, 90% of patent costs)" />
                <Stat label="TAM" value="$500B+ across edu, toys, robotics, healthcare, enterprise" />
              </div>
              <Callout>
                <strong>One sentence:</strong> Axtora Labs licenses a patented
                voice-to-voice pipeline that grounds every conversation in a
                customer-controlled knowledge base — keeping AI agents on-brand,
                age-appropriate, and accurate — and tokenizes access via
                $AXTORA on Virtuals Protocol.
              </Callout>
            </Section>

            {/* 2. What it is */}
            <Section id="what-it-is" title="2 · What Axtora is">
              <p>
                Axtora Labs builds <em>context-aware voice agents</em>: voice-to-voice
                AI that retrieves curated context before generating a reply, so
                the response is tied to a knowledge base the customer
                controls — not to whatever the underlying LLM happened to be
                trained on. The result is voice AI that stays inside its
                domain envelope: a toy stays age-appropriate, a clinic-aide
                stays medically careful, an industrial robot stays safety-first.
              </p>
              <p>
                The technology is protected by a granted Hong Kong patent
                (HK30101316), with applications pending in the US, India,
                China, and PCT international, and EU / Japan / Korea filings
                due by July 2026. The Hong Kong Productivity Council&rsquo;s
                Patent Application Grant covers ~90% of the global patent
                costs — a government vetting step that required a positive
                worldwide novelty search.
              </p>
              <p>
                Access to the technology is licensed via the $AXTORA token,
                launching on Virtuals Protocol on May 18, 2026.
              </p>
            </Section>

            {/* 3. Problem */}
            <Section id="problem" title="3 · The problem">
              <p>
                Voice AI today fails the moment the conversation has stakes.
                Five concrete failure modes:
              </p>
              <NumberedList
                items={[
                  {
                    title: "No real context awareness",
                    body: "Most assistants don't know the deployment they're in. A toy talking to a 6-year-old, a clinic aide talking to a patient, and a hotel concierge talking to a guest get treated identically.",
                  },
                  {
                    title: "Safety drift",
                    body: "Open-ended LLMs hallucinate, stray off-policy, or produce inappropriate content — especially around children, patients, and other vulnerable users.",
                  },
                  {
                    title: "Generic personas",
                    body: "Voice assistants can't reliably hold a brand voice, a domain expert role, or a curriculum-aligned tutor over a long conversation.",
                  },
                  {
                    title: "No knowledge-base control",
                    body: "Customers can't pin the conversation to their own facts (curriculum, product catalog, SOPs, clinical protocols). The model decides what's true.",
                  },
                  {
                    title: "High build cost",
                    body: "Rolling your own context-grounded voice stack means stitching together STT, retrieval, LLM, TTS, latency engineering, and safety eval — months of work per deployment.",
                  },
                ]}
              />
            </Section>

            {/* 4. Solution */}
            <Section id="solution" title="4 · Our solution">
              <p>
                A patented five-stage pipeline that makes context retrieval a
                first-class step <em>before</em> the LLM ever responds:
              </p>
              <CodeBlock>
                {`[Voice Input] → [Voice 2 Text] → [Context Search] → [Context Database]
                                                         ↓
[Context + Query] → [Large Language Model] → [Text 2 Voice] → [Voice Output]`}
              </CodeBlock>
              <p>
                Five things this gives a deployment that an off-the-shelf
                voice agent can&rsquo;t:
              </p>
              <BulletList
                items={[
                  <>
                    <strong>Context-aware processing</strong> — retrieves
                    relevant knowledge before generating, so answers are
                    grounded.
                  </>,
                  <>
                    <strong>Admin / parent control</strong> — the knowledge
                    base is curated by the deploying party.
                  </>,
                  <>
                    <strong>Trained voice personas</strong> — multiple
                    consistent voices and personalities per deployment.
                  </>,
                  <>
                    <strong>Modular architecture</strong> — drop-in for toys,
                    apps, kiosks, robots, enterprise.
                  </>,
                  <>
                    <strong>Token-licensed</strong> — $AXTORA gates access,
                    making integration a transparent, on-chain transaction.
                  </>,
                ]}
              />
            </Section>

            {/* 5. Technology */}
            <Section id="technology" title="5 · Technology">
              <p>
                The patented pipeline (HK30101316) is composed of five stages:
              </p>
              <NumberedList
                items={[
                  {
                    title: "Voice → Text",
                    body: "Multilingual, multi-accent speech recognition optimized for low latency.",
                  },
                  {
                    title: "Context Search",
                    body: "Retrieval over the curated knowledge base, conditioned on the query, the deployment context, and prior turns.",
                  },
                  {
                    title: "Context Database",
                    body: "Customer-controlled knowledge: curriculum, SKUs, SOPs, safety policies, persona definitions, brand voice, parental rules.",
                  },
                  {
                    title: "Large Language Model",
                    body: "Best-in-class LLM, but constrained: it sees the retrieved context plus the user's query and is steered by the persona system prompt.",
                  },
                  {
                    title: "Text → Voice",
                    body: "Trained voice persona synthesis, maintaining consistent character voice and emotional tone across the session.",
                  },
                ]}
              />
              <h3 className="mt-8 text-base font-semibold text-white">
                Technical advantages
              </h3>
              <BulletList
                items={[
                  "Real-time-grade latency (target sub-300ms first audio).",
                  "Multilingual STT and TTS with accent coverage.",
                  "Cloud-first with edge deployment options for privacy-sensitive workloads.",
                  "Privacy-first: customer-owned context databases, no required telemetry of conversation content.",
                  "Customizable personas and knowledge per deployment.",
                ]}
              />
            </Section>

            {/* 6. Patents */}
            <Section id="patents" title="6 · Patent portfolio">
              <h3 className="mb-2 text-base font-semibold text-white">
                Granted
              </h3>
              <BulletList
                items={[
                  <>
                    <strong>Hong Kong — HK30101316</strong> · granted May 10,
                    2024 · priority Feb 1, 2024 · enforceable.
                  </>,
                ]}
              />
              <h3 className="mb-2 mt-6 text-base font-semibold text-white">
                Pending
              </h3>
              <BulletList
                items={[
                  "United States — application filed (pending).",
                  "India — application filed (pending).",
                  "China — application 2024800631123 filed (pending).",
                  "PCT International — application filed (pending).",
                  "Europe — filing deadline July 2, 2026.",
                  "Japan — filing deadline July 2, 2026.",
                  "Korea — filing deadline July 2, 2026.",
                ]}
              />
              <Callout>
                <strong>HKPC backing.</strong> The Hong Kong Productivity
                Council&rsquo;s Patent Application Grant covers ~90% of the
                global patent expansion (HKD 150,000+ / ~USD 19,200+). The
                grant required a positive worldwide novelty search — an
                independent government-vetted check that the technology is
                genuinely new.
              </Callout>
            </Section>

            {/* 7. Market */}
            <Section id="market" title="7 · Market opportunity">
              <p>
                Combined TAM across our five segments is{" "}
                <strong className="text-[#FF6B00]">$500B+</strong>:
              </p>
              <Table
                head={["Segment", "Size", "By", "CAGR"]}
                rows={[
                  ["Conversational AI", "$49.9B", "2030", "23.1%"],
                  ["EdTech", "$404B", "2025", "16.3%"],
                  ["Smart toys", "$42.8B", "2028", "18.5%"],
                  ["Companion robotics", "$34B", "2026", "22.4%"],
                ]}
              />
              <p className="text-sm text-white/55">
                Healthcare and enterprise voice are additive on top — they
                aren&rsquo;t in the table because they overlap with
                Conversational AI accounting.
              </p>
            </Section>

            {/* 8. Use cases */}
            <Section id="use-cases" title="8 · Use cases">
              <div className="grid gap-3 sm:grid-cols-2">
                <UseCase
                  title="Educational devices"
                  body="Interactive learning companions, language tutors, homework help, special-ed support — all curriculum-pinned."
                />
                <UseCase
                  title="Smart toys"
                  body="Conversational figures and dolls with parent-controlled content libraries and consistent character voices."
                />
                <UseCase
                  title="Companion robotics"
                  body="Eldercare assistants, therapy companions, home-automation voices, pet-like companions with stable personalities."
                />
                <UseCase
                  title="Healthcare"
                  body="Patient education, medication reminders, mental-health support, clinician-grounded triage and intake."
                />
                <UseCase
                  title="Enterprise"
                  body="Customer service grounded in the company knowledge base, sales enablement, internal training, ops handoffs."
                />
                <UseCase
                  title="Live demo"
                  body="The /demo route in this site shows the pipeline running with five distinct robot personas you can talk to."
                />
              </div>
            </Section>

            {/* 9. Token */}
            <Section id="token" title="9 · The $AXTORA token">
              <div className="grid gap-3 sm:grid-cols-2">
                <Stat label="Symbol" value="$AXTORA" />
                <Stat label="Type" value="AI Agent token" />
                <Stat label="Platform" value="Virtuals Protocol" />
                <Stat label="Launch" value="May 18, 2026 (IAO)" />
              </div>
              <h3 className="mt-8 text-base font-semibold text-white">
                Token utility
              </h3>
              <NumberedList
                items={[
                  {
                    title: "Licensing access",
                    body: "$AXTORA is required to license the Axtora pipeline for commercial deployments. Pricing is transparent and on-chain.",
                  },
                  {
                    title: "Governance",
                    body: "Holders vote on feature priorities, patent portfolio expansion, partnerships, and protocol upgrades.",
                  },
                  {
                    title: "Revenue sharing",
                    body: "A portion of licensing revenue, patent royalties, API fees, and premium subscriptions is distributed to holders.",
                  },
                  {
                    title: "Priority access",
                    body: "Early features, priority support, beta program, and exclusive content.",
                  },
                ]}
              />
              <h3 className="mt-8 text-base font-semibold text-white">
                Distribution
              </h3>
              <Table
                head={["Allocation", "%", "Notes"]}
                rows={[
                  [
                    "IAO public sale",
                    "40%",
                    "Fair launch on Virtuals — no whitelist",
                  ],
                  ["Team & advisors", "20%", "2-yr vesting, 6-mo cliff"],
                  ["Development fund", "15%", "R&D, patents, infrastructure"],
                  [
                    "Marketing & community",
                    "15%",
                    "Growth, partnerships, incentives",
                  ],
                  ["Reserve", "10%", "Treasury, future opportunities"],
                ]}
              />
            </Section>

            {/* 10. IAO */}
            <Section id="iao" title="10 · IAO details">
              <div className="grid gap-3 sm:grid-cols-2">
                <Stat label="Date" value="May 18, 2026" />
                <Stat label="Platform" value="Virtuals Protocol" />
                <Stat label="Whitelist" value="None — open to all" />
                <Stat label="Pre-registration" value="Not required" />
              </div>
              <h3 className="mt-8 text-base font-semibold text-white">
                Participation
              </h3>
              <NumberedList
                items={[
                  {
                    title: "Visit app.virtuals.io",
                    body: "Open the Virtuals Protocol app in a Web3-enabled browser.",
                  },
                  {
                    title: "Connect a Web3 wallet",
                    body: "Any wallet compatible with Virtuals Protocol on Base.",
                  },
                  {
                    title: "Hold $VIRTUAL",
                    body: "$VIRTUAL is the participation currency for the IAO.",
                  },
                  {
                    title: "Open the $AXTORA listing",
                    body: "Navigate to the $AXTORA project page on May 18, 2026.",
                  },
                  {
                    title: "Participate",
                    body: "Commit your desired amount of $VIRTUAL.",
                  },
                ]}
              />
            </Section>

            {/* 11. Virtuals */}
            <Section id="virtuals" title="11 · Why Virtuals Protocol">
              <BulletList
                items={[
                  <>
                    <strong>AI-agent native</strong> — the platform is purpose-built for tokenizing AI agents, not generic tokens.
                  </>,
                  <>
                    <strong>Proven launches</strong> — multiple successful AI agent IAOs.
                  </>,
                  <>
                    <strong>Liquidity</strong> — automatic DEX integration and deep AI-agent liquidity.
                  </>,
                  <>
                    <strong>Community</strong> — engaged audience already attentive to AI-agent narratives.
                  </>,
                  <>
                    <strong>Infra</strong> — staking, governance, and cross-chain support out of the box.
                  </>,
                ]}
              />
            </Section>

            {/* 12. GTM (NEW) */}
            <Section id="gtm" title="12 · Go-to-market">
              <Callout tone="warn">
                <strong>For internal review.</strong> The GTM section below
                isn&rsquo;t lifted from the whitepaper — it&rsquo;s a
                first-pass plan based on the existing roadmap, use cases,
                and tokenomics. Treat it as a draft to challenge.
              </Callout>

              <h3 className="mt-6 text-base font-semibold text-white">
                Phase 1 — Token launch &amp; narrative (Q2 2026)
              </h3>
              <BulletList
                items={[
                  "IAO on Virtuals (May 18, 2026) is the headline event — narrative is `patented voice AI now tokenized`, not `another AI agent token`.",
                  "Lean into the patent + HKPC government vetting as the credibility moat in every piece of comms.",
                  "Whitepaper v1.0 + this TL;DR + the live /demo route are the primary content surfaces.",
                  "Community building on X, Telegram, Discord — co-marketing with Virtuals.",
                ]}
              />

              <h3 className="mt-8 text-base font-semibold text-white">
                Phase 2 — Pilot &amp; design partners (Q3 2026)
              </h3>
              <BulletList
                items={[
                  "Beta program for early adopters — 5-10 design partners across toys, edtech, eldercare, hospitality concierge, retail.",
                  "First commercial licensing agreements signed using $AXTORA.",
                  "Mobile SDK and developer-preview API.",
                  "Patent filings extended to Europe, Japan, Korea (deadline: Jul 2, 2026).",
                ]}
              />

              <h3 className="mt-8 text-base font-semibold text-white">
                Phase 3 — Commercial GA (Q4 2026)
              </h3>
              <BulletList
                items={[
                  "Self-serve licensing platform live — any developer can spin up a context-aware voice agent and pay in $AXTORA.",
                  "Public API + first hardware integrations (toy, robotics) shipping.",
                  "Staking goes live; revenue-sharing mechanism in production.",
                ]}
              />

              <h3 className="mt-8 text-base font-semibold text-white">
                Phase 4 — Marketplace &amp; scale (2027)
              </h3>
              <BulletList
                items={[
                  "AI agent persona marketplace — anyone can publish a context-grounded voice persona, monetized in $AXTORA.",
                  "Third-party SDK and verticalized templates (clinic aide, retail concierge, factory engineer).",
                  "Educational toy partnerships, healthcare pilots, additional language support.",
                  "Cross-chain expansion beyond Base.",
                ]}
              />

              <h3 className="mt-8 text-base font-semibold text-white">
                Channels
              </h3>
              <BulletList
                items={[
                  <>
                    <strong>Direct enterprise</strong> — outbound to toy, eldercare, hospitality, and retail concierge buyers; founder-led for the first 5 design partners.
                  </>,
                  <>
                    <strong>Developer self-serve</strong> — docs, SDK, sandbox; growth via the Virtuals + AI-agent dev community.
                  </>,
                  <>
                    <strong>Hardware partners</strong> — embed the pipeline in toys, robots, kiosks; partner pays in $AXTORA per device or per session.
                  </>,
                  <>
                    <strong>Token holders as evangelists</strong> — governance gives them a real seat at the table on roadmap and partnerships.
                  </>,
                ]}
              />

              <h3 className="mt-8 text-base font-semibold text-white">
                Pricing model (initial)
              </h3>
              <BulletList
                items={[
                  "Per-session licensing for low-volume / pilot customers — pay-per-conversation in $AXTORA.",
                  "Per-device flat-rate for hardware OEMs (toys, robots).",
                  "Enterprise commit + revenue share for high-volume deployments (call centers, retail).",
                  "Marketplace fee on persona sales (Phase 4).",
                ]}
              />

              <h3 className="mt-8 text-base font-semibold text-white">
                North-star metrics
              </h3>
              <BulletList
                items={[
                  "Sessions / week running on the pipeline (proxy: real usage).",
                  "Active licensed deployments (proxy: enterprise traction).",
                  "$AXTORA burnt per session (proxy: token utility velocity).",
                  "Patent jurisdictions granted (proxy: defensive moat).",
                ]}
              />
            </Section>

            {/* 13. Roadmap */}
            <Section id="roadmap" title="13 · Roadmap">
              <h3 className="text-base font-semibold text-white">2026</h3>
              <RoadmapBlock
                quarter="Q2"
                items={[
                  "IAO launch on Virtuals (May 18)",
                  "Token listing on DEX",
                  "Community building & marketing",
                  "Whitepaper v1.0",
                ]}
              />
              <RoadmapBlock
                quarter="Q3"
                items={[
                  "Beta for early adopters",
                  "First commercial licensing deals",
                  "Patent filings: EU, Japan, Korea",
                  "Mobile app development",
                ]}
              />
              <RoadmapBlock
                quarter="Q4"
                items={[
                  "Full commercial launch of licensing platform",
                  "Developer API access",
                  "First hardware integrations",
                  "Staking goes live",
                ]}
              />
              <h3 className="mt-8 text-base font-semibold text-white">2027</h3>
              <RoadmapBlock
                quarter="Q1"
                items={[
                  "Expansion to additional blockchains",
                  "Advanced voice persona library",
                  "Enterprise partnership announcements",
                  "Whitepaper v2.0",
                ]}
              />
              <RoadmapBlock
                quarter="Q2"
                items={[
                  "AI agent marketplace",
                  "Third-party developer SDK",
                  "Educational toy partnerships",
                  "Healthcare pilot programs",
                ]}
              />
              <RoadmapBlock
                quarter="Q3–Q4"
                items={[
                  "Global patent portfolio completion",
                  "Additional languages",
                  "Robotics integrations",
                  "Revenue-sharing distributions begin",
                ]}
              />
            </Section>

            {/* 14. Team */}
            <Section id="team" title="14 · Team">
              <BulletList
                items={[
                  <>
                    <strong>Founder &amp; CEO</strong> — voice tech and NLP background; AI + blockchain.
                  </>,
                  <>
                    <strong>CTO</strong> — ML architect; scalable cloud infra.
                  </>,
                  <>
                    <strong>Patent counsel</strong> — IP specialist running the global patent strategy.
                  </>,
                  <>
                    <strong>Advisors</strong> — AI/ML researchers, DeFi/protocol engineers, edu/toy/robotics industry vets, regulatory counsel.
                  </>,
                ]}
              />
              <Callout tone="warn">
                <strong>For internal review.</strong> Names, photos, LinkedIn URLs, and bios are intentionally placeholder pending sign-off. Drop final copy + headshots into <code>app/tldr/page.tsx</code> in the team section.
              </Callout>
            </Section>

            {/* 15. Risks */}
            <Section id="risks" title="15 · Risks &amp; disclosure">
              <BulletList
                items={[
                  "$AXTORA is a utility token, not a security. No claim of investment return is made.",
                  "Participation in the IAO involves risk; conduct independent research before participating.",
                  "Patent applications outside Hong Kong are pending and may be modified or rejected.",
                  "Roadmap dates are best-effort and subject to engineering and market conditions.",
                  "This page is a project brief, not financial, legal, or tax advice.",
                ]}
              />
            </Section>

            {/* 16. Links */}
            <Section id="links" title="16 · Links">
              <div className="grid gap-3 sm:grid-cols-2">
                <LinkCard href="https://x.com/axtoralabs" label="X (Twitter)" handle="@axtoralabs" />
                <LinkCard href="https://t.me/axtoralabs" label="Telegram" handle="@axtoralabs" />
                <LinkCard href="https://discord.gg/axtoralabs" label="Discord" handle="axtoralabs" />
                <LinkCard href="https://app.virtuals.io" label="Virtuals Protocol" handle="app.virtuals.io" />
                <LinkCard href="/whitepaper" label="Whitepaper" handle="/whitepaper" external={false} />
                <LinkCard href="/demo" label="Live voice demo" handle="/demo" external={false} />
                <LinkCard href="mailto:hello@axtoralabs.com" label="General" handle="hello@axtoralabs.com" />
                <LinkCard href="mailto:press@axtoralabs.com" label="Press" handle="press@axtoralabs.com" />
              </div>
            </Section>

            <p className="mt-16 border-t border-white/10 pt-6 text-xs text-white/40">
              © 2026 Axtora Labs · Patent No. HK30101316 · This document is
              for informational purposes only and is not a solicitation,
              prospectus, or financial advice.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Small presentational helpers                                      */
/* ---------------------------------------------------------------- */

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-14 scroll-mt-24">
      <h2 className="mb-5 text-2xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      <div className="space-y-4 text-[15px] leading-[1.7] text-white/75">
        {children}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#FF6B00]/15 bg-[#1f1f26]/60 p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FF6B00]">
        {label}
      </p>
      <p className="mt-2 text-base text-white">{value}</p>
    </div>
  );
}

function Callout({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: "info" | "warn";
}) {
  const ring =
    tone === "warn"
      ? "border-amber-500/30 bg-amber-500/5"
      : "border-[#FF6B00]/25 bg-[#FF6B00]/5";
  return (
    <div
      className={`my-6 rounded-xl border ${ring} p-4 text-[15px] leading-relaxed text-white/85`}
    >
      {children}
    </div>
  );
}

function NumberedList({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <ol className="my-2 space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6B00]/15 text-xs font-semibold text-[#FF6B00]">
            {i + 1}
          </span>
          <div>
            <p className="font-medium text-white">{it.title}</p>
            <p className="mt-0.5 text-white/65">{it.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="my-2 space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FF6B00]" />
          <span className="text-white/75">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="my-4 overflow-x-auto rounded-xl border border-[#FF6B00]/15 bg-[#0e0f13] p-4 text-[12.5px] leading-relaxed text-white/80">
      <code>{children}</code>
    </pre>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full border-collapse text-[14px]">
        <thead>
          <tr className="bg-[#1f1f26]">
            {head.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF6B00]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-t border-white/5 odd:bg-[#1a1a20]/30"
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-white/80">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UseCase({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#1f1f26]/40 p-4 transition-colors hover:border-[#FF6B00]/30">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FF6B00]">
        Use case
      </p>
      <p className="mt-2 text-base font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm text-white/70">{body}</p>
    </div>
  );
}

function RoadmapBlock({
  quarter,
  items,
}: {
  quarter: string;
  items: string[];
}) {
  return (
    <div className="mt-3 flex gap-4 rounded-xl border border-white/10 bg-[#1a1a20]/40 p-4">
      <div className="flex-shrink-0 text-sm font-semibold text-[#FF6B00]">
        {quarter}
      </div>
      <ul className="space-y-1.5 text-sm text-white/75">
        {items.map((i, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#FF6B00]/70" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LinkCard({
  href,
  label,
  handle,
  external = true,
}: {
  href: string;
  label: string;
  handle: string;
  external?: boolean;
}) {
  const Component: React.ElementType = external ? "a" : Link;
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Component
      href={href}
      {...externalProps}
      className="group flex items-center justify-between rounded-xl border border-white/10 bg-[#1f1f26]/40 px-4 py-3 transition-colors hover:border-[#FF6B00]/30 hover:bg-[#FF6B00]/5"
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FF6B00]">
          {label}
        </p>
        <p className="mt-1 text-sm text-white/85">{handle}</p>
      </div>
      {external && (
        <ExternalLink className="h-4 w-4 text-white/45 transition-colors group-hover:text-[#FF6B00]" />
      )}
    </Component>
  );
}
