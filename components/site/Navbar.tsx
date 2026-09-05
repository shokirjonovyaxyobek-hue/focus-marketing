"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "Biz haqimizda" },
  { href: "#services", label: "Xizmatlar" },
  { href: "#projects", label: "Loyihalar" },
  { href: "#team", label: "Jamoa" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop / Main Navbar */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.92)"
            : "rgba(255,255,255,0)",
          boxShadow: scrolled
            ? "0 1px 0 rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between py-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col items-center shrink-0 leading-none"
          >
            <Image
              src="/focus-logo.png"
              alt="FOCUS Marketing"
              width={64}
              height={64}
              priority
              className="h-14 w-14 object-contain"
            />

            <span className="mt-0.5 text-[10px] text-foreground/45 font-semibold tracking-wide">
              Focus Marketing
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-foreground/70 hover:text-focus-red transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Contact Button */}
          <a
            href="#contact"
            className="hidden lg:inline-flex items-center gap-1.5 bg-focus-red hover:bg-focus-red-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Hamkorlik uchun
            <span aria-hidden>→</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Menyuni ochish"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-border-gray text-foreground"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-white"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-border-gray">
              <span className="font-extrabold text-base">
                FOCUS<span className="text-focus-red">.</span>
              </span>

              <button
                onClick={() => setOpen(false)}
                aria-label="Menyuni yopish"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border-gray"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Links */}
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="flex flex-col px-5 py-8 gap-1"
            >
              {links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 12,
                    },
                    show: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  className="text-lg font-semibold text-foreground py-3.5 border-b border-border-gray"
                >
                  {l.label}
                </motion.a>
              ))}

              {/* Mobile Contact Button */}
              <motion.a
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 12,
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center gap-1.5 bg-focus-red text-white text-sm font-semibold px-5 py-3.5 rounded-full"
              >
                Hamkorlik uchun →
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}