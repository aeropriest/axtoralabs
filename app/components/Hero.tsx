"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#111419]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/banner.png')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,16,0.72)_0%,rgba(12,15,20,0.56)_30%,rgba(14,16,21,0.26)_58%,rgba(17,20,25,0.46)_100%)]" />
      <div className="absolute inset-0">
        <div className="absolute left-[-8%] top-[20%] h-[340px] w-[340px] rounded-full bg-[#FF6B00]/10 blur-[140px]" />
        <div className="absolute right-[8%] top-[12%] h-[280px] w-[280px] rounded-full bg-[#FF6B00]/8 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-16 lg:pt-40">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="flex min-h-[320px] max-w-2xl flex-col justify-between text-center sm:text-left lg:max-w-[42rem] lg:min-h-[360px] lg:pb-12">
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-xl text-[1.05rem] leading-relaxed text-white/88 sm:text-[1.35rem] md:text-[1.75rem]"
            >
              Context-aware voice AI built for branded agents, patented orchestration, and real-world deployment.
            </motion.p>

            <div>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-0 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#FFB27A] sm:text-xs md:text-sm"
              >
                Now Tokenized with $AXTORA on Virtuals Protocol
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-5 text-left sm:justify-start md:gap-7"
              >
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Shield className="w-5 h-5 text-[#FF6B00]" />
                  <span>Patented AI (HK30101316)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Zap className="w-5 h-5 text-[#FF6B00]" />
                  <span>Virtuals Protocol IAO</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Globe className="w-5 h-5 text-[#FF6B00]" />
                  <span>Global Patent Portfolio</span>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center lg:justify-end lg:self-end lg:pb-48"
          >
            <Link
              href="#iao"
              className="group inline-flex items-center gap-2 rounded-full bg-[#FF6B00] px-7 py-3.5 text-base font-semibold text-[#1C1C22] shadow-[0_16px_50px_rgba(255,107,0,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff7a14] hover:shadow-[0_20px_60px_rgba(255,107,0,0.34)] sm:px-8 sm:py-4 sm:text-lg lg:min-w-[250px] lg:justify-center"
            >
              Participate in the IAO
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
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
