"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#technology", label: "Technology" },
  { href: "#agent", label: "The Agent" },
  { href: "#iao", label: "IAO" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#community", label: "Community" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1C1C22]/90 backdrop-blur-lg border-b border-[#FF6B00]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111318]/85 ring-1 ring-[#FF6B00]/25 shadow-[0_10px_30px_rgba(0,0,0,0.25)] md:h-12 md:w-12">
              <Image
                src="/logo.png"
                alt="Axtora Labs"
                width={52}
                height={52}
                className="w-8 h-auto md:w-9"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg md:text-xl font-bold text-white tracking-tight">
                Axtora Labs
              </span>
              <span className="hidden md:block text-[10px] uppercase tracking-[0.22em] text-[#FF6B00]">
                Intelligent Agents
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-[#FF6B00] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="https://x.com/axtoralabs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-[#FF6B00] border border-[#FF6B00]/50 rounded-full hover:bg-[#FF6B00]/10 transition-all duration-200"
            >
              Follow @axtoralabs
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1C1C22]/95 backdrop-blur-lg border-b border-[#FF6B00]/10"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-gray-300 hover:text-[#FF6B00] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="https://x.com/axtoralabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-[#FF6B00] border border-[#FF6B00]/50 rounded-full"
                >
                  Follow @axtoralabs
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
