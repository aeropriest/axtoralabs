"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Users, Briefcase, Microscope } from "lucide-react";

const teamMembers = [
  {
    name: "Chief Executive Officer",
    role: "Vision, Strategy & Commercialization",
    icon: Users,
    points: [
      "Leading Axtora Labs vision and go-to-market strategy",
      "Driving the IAO launch and Virtuals Protocol positioning",
      "Overseeing patent portfolio and global IP expansion",
    ],
  },
  {
    name: "Chief Technology Officer",
    role: "Voice AI Architecture & Agent Systems",
    icon: Microscope,
    points: [
      "Architect of the patented voice-to-voice AI pipeline",
      "Context retrieval, persona orchestration, and LLM integration",
      "Scalable deployment across devices, APIs, and on-chain infrastructure",
    ],
  },
  {
    name: "Chief Marketing Officer",
    role: "Community, Growth & Ecosystem",
    icon: Briefcase,
    points: [
      "Building the Axtora community across X, Telegram, and Discord",
      "Leading partnerships within the Virtuals Protocol ecosystem",
      "Driving awareness, KOL engagement, and IAO participation",
    ],
  },
];

const trustSignals = [
  "Granted Hong Kong patent HK30101316",
  "Global filings across USA, India, China, and PCT",
  "90% patent expansion funding from HKPC PAG",
  "Launch structured for Virtuals Protocol IAO participation",
];

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6B00]/5 to-transparent" />
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 mb-6">
            <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
            <span className="text-sm text-[#FF6B00]">Trust & Execution</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Why Axtora Can Win on Virtuals</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Axtora Labs combines patented AI infrastructure, commercialization focus,
            and a launch narrative built for the Virtuals ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center mb-4">
                <member.icon className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
              <p className="text-sm text-[#FF6B00] mb-4">{member.role}</p>
              <div className="space-y-3">
                {member.points.map((point) => (
                  <div key={point} className="text-sm text-gray-400 flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] mt-2 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Launch Trust Signals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trustSignals.map((signal) => (
              <div key={signal} className="rounded-xl bg-white/5 p-4 text-sm text-gray-300">
                {signal}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
