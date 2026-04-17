"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Mic,
  Database,
  Shield,
  Cpu,
  Network,
  Volume2,
  Search,
  Users,
  TrendingUp,
} from "lucide-react";

const technologyFlow = [
  {
    icon: Mic,
    title: "Voice 2 Text",
    description: "Natural speech recognition captures user intent",
  },
  {
    icon: Search,
    title: "Context Search",
    description: "Intelligent retrieval from context database",
  },
  {
    icon: Database,
    title: "Context Database",
    description: "Parent/admin-curated knowledge base",
  },
  {
    icon: Brain,
    title: "Large Language Model",
    description: "AI processes context + query for response",
  },
  {
    icon: Volume2,
    title: "Text 2 Voice",
    description: "Natural voice synthesis with trained personas",
  },
];

const features = [
  {
    icon: Mic,
    title: "Voice-to-Voice AI Pipeline",
    description:
      "Complete end-to-end voice interaction: Speech recognition → Context retrieval → LLM processing → Voice synthesis. Seamless, natural conversations.",
  },
  {
    icon: Database,
    title: "Context-Aware Intelligence",
    description:
      "Parents and administrators curate context databases. The AI searches and retrieves relevant context before responding — ensuring safe, appropriate, personalized interactions.",
  },
  {
    icon: Users,
    title: "Persona-Based Voice Training",
    description:
      "Custom voice personas trained for specific characters — teddy bears, educational tutors, companion robots. Each device has its own unique, consistent personality.",
  },
  {
    icon: Shield,
    title: "Patented Technology Stack",
    description:
      "Hong Kong Patent HK30101316 protects our unique context-aware voice AI architecture. Global filings in USA, India, China, and PCT ensure worldwide IP protection.",
  },
  {
    icon: Cpu,
    title: "On-Chain Tokenization",
    description:
      "Tokenized on Virtuals Protocol, enabling decentralized licensing, transparent governance, and community ownership of AI infrastructure.",
  },
  {
    icon: Network,
    title: "Universal Deployment",
    description:
      "Deploy across toys, robots, smart devices, healthcare tools, and enterprise solutions. One patented technology, infinite applications.",
  },
];

const marketStats = [
  {
    value: "$49.9B",
    label: "Conversational AI Market",
    year: "by 2030",
    growth: "22.6% CAGR",
  },
  {
    value: "$404B",
    label: "EdTech Market",
    year: "by 2025",
    growth: "16.3% CAGR",
  },
  {
    value: "$42.8B",
    label: "Smart Toys Market",
    year: "by 2028",
    growth: "15.1% CAGR",
  },
  {
    value: "$34B",
    label: "Companion Robotics",
    year: "by 2026",
    growth: "19.2% CAGR",
  },
];

const patents = [
  { region: "Hong Kong", status: "GRANTED", number: "HK30101316" },
  { region: "USA", status: "Filed", number: "18/789,925" },
  { region: "India", status: "Filed", number: "202414097226" },
  { region: "China", status: "Filed", number: "2024800631123" },
  { region: "PCT", status: "Filed", number: "PCT/CN2024/135085" },
];

export default function Technology() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="technology" className="py-24 md:py-32 relative neural-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 mb-6">
            <Shield className="w-4 h-4 text-[#FF6B00]" />
            <span className="text-sm text-[#FF6B00]">Patent No. HK30101316</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Voice-to-Voice Context-Aware AI</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            The world&apos;s first patented context-aware voice AI pipeline. Users speak naturally, 
            the AI retrieves curated context, processes through LLMs, and responds with trained voice personas.
            <span className="text-[#FF6B00]"> Protected globally. Tokenized on-chain.</span>
          </p>
        </motion.div>

        {/* Technology Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-xl font-bold text-white text-center mb-8">
            How It Works: The Patented Technology Stack
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
            {technologyFlow.map((step, index) => (
              <div key={step.title} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center min-w-[140px]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center mx-auto mb-2">
                    <step.icon className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <p className="text-white font-medium text-sm">{step.title}</p>
                  <p className="text-gray-500 text-xs mt-1">{step.description}</p>
                </motion.div>
                {index < technologyFlow.length - 1 && (
                  <div className="hidden md:block text-[#FF6B00] mx-2">→</div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            Parents & administrators control the context database — ensuring safe, appropriate AI responses for every use case.
          </p>
        </motion.div>

        {/* Market Opportunity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-2xl p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-[#FF6B00]" />
            <h3 className="text-2xl font-bold text-white">
              Massive Market Opportunity
            </h3>
          </div>
          <p className="text-gray-400 mb-8 max-w-3xl">
            Voice AI is exploding. Every smart toy, companion robot, educational device, and healthcare tool
            needs context-aware conversational AI. $AXTORA is positioned to capture this multi-billion dollar market
            with patented, proven technology.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {marketStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center p-4 rounded-xl bg-white/5"
              >
                <p className="text-3xl md:text-4xl font-bold text-[#FF6B00] mb-1">
                  {stat.value}
                </p>
                <p className="text-white text-sm font-medium">{stat.label}</p>
                <p className="text-gray-500 text-xs">{stat.year}</p>
                <p className="text-green-400 text-xs mt-1">{stat.growth}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-xl bg-[#FF6B00]/5 border border-[#FF6B00]/20">
            <p className="text-center text-sm text-gray-300">
              <span className="text-[#FF6B00] font-semibold">Combined TAM: $500B+</span> —
              Every device using our AI = token demand. Patent protection = sustainable competitive advantage.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Patent Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Global Patent Portfolio
              </h3>
              <p className="text-gray-400">
                Priority date: 01 February 2024 — Protected across all jurisdictions
              </p>
            </div>
            <div className="mt-4 md:mt-0 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
              <span className="text-green-400 text-sm font-medium">
                90% Funded by HKPC PAG
              </span>
            </div>
          </div>

          <div className="mb-6 p-4 rounded-xl bg-white/5">
            <p className="text-sm text-gray-300">
              <span className="text-[#FF6B00] font-semibold">Government-Vetted Innovation:</span> The Hong Kong Productivity Council (HKPC)
              Patent Application Grant required a positive patent search report confirming NO similar technology exists worldwide.
              This is genuinely innovative — not another AI chatbot clone.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {patents.map((patent) => (
              <div
                key={patent.region}
                className="text-center p-4 rounded-xl bg-white/5"
              >
                <p className="text-[#FF6B00] font-semibold mb-1">
                  {patent.region}
                </p>
                <p
                  className={`text-xs font-medium mb-1 ${
                    patent.status === "GRANTED"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {patent.status}
                </p>
                <p className="text-gray-500 text-xs">{patent.number}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Upcoming filings: Europe, Japan, Korea (deadline: 02 Jul 2026) | Total investment: HKD 150,000+ (~USD 19,200+)
          </p>
        </motion.div>

        {/* Whitepaper CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="glass-card rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Read the Whitepaper
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Deep dive into the patented voice-to-voice AI technology, market analysis,
            token economics, and the roadmap for the $AXTORA ecosystem.
          </p>
          <a
            href="/whitepaper"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-[#1C1C22] bg-[#FF6B00] rounded-full hover:bg-[#FF6B00]/90 transition-all duration-300 glow-effect"
          >
            Download Whitepaper
          </a>
          <p className="mt-4 text-sm text-gray-500">
            Comprehensive technical documentation available now
          </p>
        </motion.div>
      </div>
    </section>
  );
}
