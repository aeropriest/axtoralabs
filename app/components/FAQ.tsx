"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is the $AXTORA token?",
    answer:
      "$AXTORA is the utility token for the Axtora Labs AI agent on Virtuals Protocol. It represents ownership in the patented context-aware voice AI technology and provides access to licensing, governance, and revenue sharing from AI deployments.",
  },
  {
    question: "What is the patent number?",
    answer:
      "Hong Kong Patent No. HK30101316, granted on May 10, 2024. We also have pending applications in the USA, India, China, PCT international, and upcoming filings in Europe, Japan, and Korea. The priority date is February 1, 2024.",
  },
  {
    question: "When is the IAO launching?",
    answer:
      "The Initial Agent Offering launches on May 18, 2026 on Virtuals Protocol. Participation is open to all — no whitelist required. Join directly on Virtuals Protocol at launch.",
  },
  {
    question: "How do I participate in the IAO?",
    answer:
      "Simply visit the Virtuals Protocol platform on May 18, 2026 and participate in the $AXTORA IAO. You'll need a Web3 wallet compatible with Virtuals and $VIRTUAL tokens to participate. No prior registration or whitelist needed.",
  },
  {
    question: "What can the AI technology do?",
    answer:
      "Our patented voice-to-voice AI pipeline enables natural conversations with context awareness. Users speak naturally, the AI retrieves curated context from a parent/admin-controlled database, processes through LLMs, and responds with trained voice personas. Perfect for educational toys, companion robots, smart devices, and more.",
  },
  {
    question: "What is the market opportunity?",
    answer:
      "The combined TAM is $500B+ across conversational AI ($49.9B by 2030), EdTech ($404B by 2025), smart toys ($42.8B by 2028), and companion robotics ($34B by 2026). Every device using our AI creates token demand.",
  },
  {
    question: "How is the technology funded?",
    answer:
      "The Hong Kong Productivity Council (HKPC) Patent Application Grant program funds 90% of our global patent expansion, totaling HKD 150,000+ (~USD 19,200+). This government funding validates the commercial merit and innovation of our technology.",
  },
  {
    question: "Where can I follow updates?",
    answer:
      "Follow @axtoralabs on X, Telegram, and Discord for the latest updates, AMAs, launch reminders, and community discussions.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 relative neural-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 mb-6">
            <HelpCircle className="w-4 h-4 text-[#FF6B00]" />
            <span className="text-sm text-[#FF6B00]">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <p className="text-lg text-gray-400">
            Everything you need to know about $AXTORA and the IAO.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-white font-semibold pr-4">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-[#FF6B00] transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            Still have questions?
          </p>
          <a
            href="https://discord.gg/axtoralabs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B00] text-[#1C1C22] font-semibold rounded-full hover:bg-[#FF6B00]/90 transition-colors"
          >
            Ask in Discord
          </a>
        </motion.div>
      </div>
    </section>
  );
}
