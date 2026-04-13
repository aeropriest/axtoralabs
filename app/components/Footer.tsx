"use client";

import Link from "next/link";
import Image from "next/image";
import SocialIcons from "./SocialIcons";

const footerLinks = {
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Technology", href: "#technology" },
    { label: "The Agent", href: "#agent" },
    { label: "IAO", href: "#iao" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Community", href: "#community" },
  ],
  resources: [
    { label: "Whitepaper", href: "/whitepaper.md" },
    { label: "Documentation", href: "#" },
    { label: "Patent Info", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1C1C22]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="#home" className="inline-flex items-center gap-3 mb-4 transition-opacity hover:opacity-90">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#111318] ring-1 ring-[#FF6B00]/30 shadow-[0_12px_32px_rgba(0,0,0,0.28)]">
                <Image
                  src="/logo.png"
                  alt="Axtora Labs"
                  width={52}
                  height={52}
                  className="w-9 h-auto"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold text-[#FFB27A] tracking-tight">Axtora Labs</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#FF6B00] mt-1">
                  Intelligent Agents
                </span>
              </div>
            </Link>
            <p className="text-[#FFB27A]/80 text-sm mb-6 leading-relaxed">
              Tokenizing the future of context-aware conversational AI agents on
              Virtuals Protocol.
            </p>
            <SocialIcons size="sm" theme="footer" />
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#FFB27A] font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#FFB27A]/75 text-sm hover:text-[#FF6B00] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[#FFB27A] font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#FFB27A]/75 text-sm hover:text-[#FF6B00] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#FFB27A] font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#FFB27A]/75 text-sm hover:text-[#FF6B00] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#FFB27A]/65 text-sm">
              © 2026 Axtora Labs. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[#FFB27A]/65 text-sm">
                Patent No. HK30101316
              </span>
              <span className="text-[#FF6B00]/40">|</span>
              <Link
                href="https://x.com/axtoralabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6B00] text-sm hover:underline"
              >
                @axtoralabs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
