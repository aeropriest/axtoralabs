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
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#111419]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,0,0.10),transparent_28%),linear-gradient(180deg,#15181d_0%,#12151a_50%,#111419_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/35 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-12 lg:grid-cols-[1.2fr_0.85fr_0.85fr_0.85fr]">
          <div className="max-w-sm">
            <Link href="#home" className="mb-5 inline-flex items-center gap-3 transition-opacity hover:opacity-90">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111318] ring-1 ring-[#FF6B00]/30 shadow-[0_16px_34px_rgba(0,0,0,0.32)]">
                <Image
                  src="/logo.png"
                  alt="Axtora Labs"
                  width={52}
                  height={52}
                  className="w-9 h-auto"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[#FFF2E8]">Axtora Labs</span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[#FF6B00]">
                  Intelligent Agents
                </span>
              </div>
            </Link>
            <p className="mb-6 text-sm leading-7 text-white/68 sm:text-[15px]">
              Tokenizing the future of context-aware conversational AI agents on
              Virtuals Protocol.
            </p>
            <SocialIcons size="sm" theme="footer" />
          </div>

          <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm">
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFB27A]">Navigation</h4>
            <ul className="space-y-3.5">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/68 transition-colors hover:text-[#FF6B00]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm">
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFB27A]">Resources</h4>
            <ul className="space-y-3.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/68 transition-colors hover:text-[#FF6B00]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm">
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFB27A]">Legal</h4>
            <ul className="space-y-3.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/68 transition-colors hover:text-[#FF6B00]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-7">
          <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <p className="text-sm text-white/45">
              © 2026 Axtora Labs. All rights reserved.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-end">
              <span className="rounded-full border border-[#FF6B00]/20 bg-[#FF6B00]/8 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#FFB27A]">
                Patent No. HK30101316
              </span>
              <Link
                href="https://x.com/axtoralabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#FF6B00] transition-colors hover:text-[#FFB27A]"
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
