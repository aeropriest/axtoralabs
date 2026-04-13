"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Users, Mail, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import SocialIcons from "./SocialIcons";

const socialPlatforms = [
  {
    name: "X (Twitter)",
    handle: "@axtoralabs",
    href: "https://x.com/axtoralabs",
    description: "Latest updates & announcements",
    color: "hover:bg-white/10",
  },
  {
    name: "Telegram",
    handle: "@axtoralabs",
    href: "https://t.me/axtoralabs",
    description: "Community chat & support",
    color: "hover:bg-blue-500/10",
  },
  {
    name: "Discord",
    handle: "axtoralabs",
    href: "https://discord.gg/axtoralabs",
    description: "Developer discussions",
    color: "hover:bg-indigo-500/10",
  },
];

export default function Community() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service (Resend, Formspree, etc.)
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section id="community" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6B00]/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 mb-6">
            <Users className="w-4 h-4 text-[#FF6B00]" />
            <span className="text-sm text-[#FF6B00]">Join the Movement</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">
              Follow @axtoralabs Everywhere
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Join 10,000+ builders already following @axtoralabs. Be part of the
            community shaping the future of tokenized AI.
          </p>
        </motion.div>

        {/* Social Platforms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block glass-card rounded-xl p-5 transition-all duration-300 ${platform.color} hover:scale-[1.02]`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{platform.name}</h3>
                    <p className="text-[#FF6B00] text-sm">{platform.handle}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500" />
                </div>
                <p className="text-sm text-gray-400">{platform.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Large Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-gray-400 mb-6">Quick Follow</p>
          <SocialIcons size="lg" />
        </motion.div>

        {/* Email Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-card rounded-2xl p-8 max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-[#FF6B00]" />
            <h3 className="text-xl font-bold text-white">Stay Updated</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Get exclusive IAO updates, agent licensing announcements, and early
            access to new features.
          </p>

          {isSubmitted ? (
            <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400">
                Thanks for subscribing! Check your inbox.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#FF6B00] text-[#1C1C22] font-semibold rounded-xl hover:bg-[#FF6B00]/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>

        {/* Partners / Trust Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-gray-500 text-sm mb-6">Launching on</p>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-3 px-6 py-3 glass-card rounded-xl">
              <Sparkles className="w-6 h-6 text-[#FF6B00]" />
              <span className="text-white font-medium">Virtuals Protocol</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
