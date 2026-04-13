"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import SocialIcons from "./SocialIcons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden circuit-bg"
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[#1C1C22]/78 z-[1]" />

      {/* Subtle orange glow effects */}
      <div className="absolute inset-0 z-[2]">
        <div className="absolute top-1/4 left-1/3 w-[420px] h-[420px] bg-[#FF6B00]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[320px] h-[320px] bg-[#FF6B00]/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/20 bg-black/20 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.22em] text-[#FFB27A] backdrop-blur-sm"
          >
            Intelligent Agent Orchestration
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
          >
            <span className="gradient-text">Axtora Labs</span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-3"
          >
            Context-aware voice AI built for branded agents, patented orchestration, and real-world deployment.
          </motion.p>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg text-[#FFB27A] font-medium mb-10"
          >
            Now Tokenized with $AXTORA on Virtuals Protocol
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="#iao"
              className="group flex items-center gap-2 px-8 py-4 text-lg font-semibold text-[#1C1C22] bg-[#FF6B00] rounded-full hover:shadow-lg hover:shadow-[#FF6B00]/30 transition-all duration-300 glow-effect"
            >
              Participate in the IAO
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#agent"
              className="px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-full hover:border-[#FF6B00]/50 hover:bg-white/5 transition-all duration-300"
            >
              Learn About the Agent
            </Link>
          </motion.div>

          {/* Social Follow CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-16"
          >
            <p className="text-sm text-gray-400 mb-4">
              Follow @axtoralabs on X, Telegram, and Discord
            </p>
            <SocialIcons size="lg" />
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-12"
          >
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-5 h-5 text-[#FF6B00]" />
              <span>Patented AI (HK30101316)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Zap className="w-5 h-5 text-[#FF6B00]" />
              <span>Virtuals Protocol IAO</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Globe className="w-5 h-5 text-[#FF6B00]" />
              <span>Global Patent Portfolio</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-[#FF6B00] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
