"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Cpu, Code, Network, CheckCircle } from "lucide-react";

const roadmapItems = [
  {
    quarter: "Q2 2026",
    title: "IAO Launch",
    icon: Rocket,
    status: "current",
    items: [
      "Initial Agent Offering on Virtuals Protocol",
      "$AXTORA token deployment",
      "Community building & social growth",
      "First 10,000 followers milestone",
    ],
  },
  {
    quarter: "Q3 2026",
    title: "First Deployments",
    icon: Cpu,
    status: "upcoming",
    items: [
      "Interactive education device pilots",
      "Smart toy integrations",
      "Companion robot partnerships",
      "Beta licensing program launch",
    ],
  },
  {
    quarter: "Q4 2026",
    title: "Developer Tools",
    icon: Code,
    status: "upcoming",
    items: [
      "Open licensing platform",
      "Developer SDK release",
      "API documentation & tutorials",
      "First enterprise partnerships",
    ],
  },
  {
    quarter: "2027",
    title: "Multi-Agent Ecosystem",
    icon: Network,
    status: "upcoming",
    items: [
      "Multi-agent orchestration",
      "Cross-platform deployment tools",
      "Global licensing expansion",
      "Advanced AI capabilities",
    ],
  },
];

export default function Roadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="roadmap" className="py-24 md:py-32 relative neural-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Our journey to revolutionize conversational AI and build the
            largest tokenized AI agent ecosystem.
          </p>
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Vertical Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF6B00]/50 via-[#FF6B00]/20 to-transparent" />

          <div className="space-y-12 md:space-y-0">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.quarter}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative md:flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div
                    className={`glass-card rounded-2xl p-6 ${
                      item.status === "current"
                        ? "border-[#FF6B00]/30"
                        : ""
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 mb-4 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          item.status === "current"
                            ? "bg-[#FF6B00] text-[#1C1C22]"
                            : "bg-[#FF6B00]/10 text-[#FF6B00]"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[#FF6B00] text-sm font-medium">
                          {item.quarter}
                        </p>
                        <h3 className="text-xl font-bold text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <ul
                      className={`space-y-2 ${
                        index % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {item.items.map((listItem) => (
                        <li
                          key={listItem}
                          className={`flex items-center gap-2 text-sm text-gray-400 ${
                            index % 2 === 0 ? "md:flex-row-reverse" : ""
                          }`}
                        >
                          <CheckCircle
                            className={`w-4 h-4 flex-shrink-0 ${
                              item.status === "current"
                                ? "text-[#FF6B00]"
                                : "text-gray-600"
                            }`}
                          />
                          {listItem}
                        </li>
                      ))}
                    </ul>
                    {item.status === "current" && (
                      <div className="mt-4 inline-block px-3 py-1 bg-[#FF6B00]/20 rounded-full">
                        <span className="text-xs text-[#FF6B00] font-medium">
                          Current Phase
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Center Node (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#1C1C22] border-2 border-[#FF6B00] z-10">
                  {item.status === "current" && (
                    <div className="absolute inset-0 rounded-full bg-[#FF6B00] animate-ping opacity-50" />
                  )}
                </div>

                {/* Empty Space for Alternating Layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-white font-medium mb-4">
              &ldquo;Own the voice of the future.&rdquo;
            </p>
            <p className="text-gray-400">
              $AXTORA isn&apos;t just another AI token. It&apos;s patented, proven,
              government-backed technology ready to power the next generation of
              conversational devices worldwide.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
