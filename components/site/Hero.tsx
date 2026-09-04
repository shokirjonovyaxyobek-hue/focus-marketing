"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Target, ChartColumn as ChartIcon } from "lucide-react";

export function Hero({
  title,
  subtitle,
  ctaText,
  ctaSecond,
}: {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaSecond: string;
}) {
  const words = title.split(" ");

  return (
    <section className="relative pt-32 pb-14 lg:pt-40 lg:pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_70%_0%,rgba(216,31,38,0.06),transparent)]" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-foreground"
          >
            {words.map((word, i) => {
              const isHighlight = word.toLowerCase().startsWith("bosqichga");
              return (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block mr-3 ${isHighlight ? "text-focus-red" : ""}`}
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 text-lg text-foreground/60 max-w-md leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#services"
              className="inline-flex items-center gap-2 bg-focus-red hover:bg-focus-red-dark text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-colors"
            >
              {ctaText} <span aria-hidden>→</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 border border-border-gray hover:border-focus-red hover:text-focus-red text-foreground font-semibold text-sm px-6 py-3.5 rounded-full transition-colors"
            >
              {ctaSecond}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square max-w-md mx-auto w-full"
        >
          <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-focus-red/8 to-surface-gray border border-border-gray overflow-hidden">
            {/* Abstract growth-chart graphic so the panel doesn't sit empty */}
            <svg
              viewBox="0 0 320 320"
              className="absolute inset-0 w-full h-full opacity-[0.35]"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="heroBar" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#d81f26" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#d81f26" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              {[
                { x: 40, h: 60 },
                { x: 90, h: 110 },
                { x: 140, h: 85 },
                { x: 190, h: 150 },
                { x: 240, h: 130 },
              ].map((bar) => (
                <rect
                  key={bar.x}
                  x={bar.x}
                  y={260 - bar.h}
                  width="34"
                  height={bar.h}
                  rx="8"
                  fill="url(#heroBar)"
                />
              ))}
              <polyline
                points="40,220 90,180 140,200 190,120 240,150 280,90"
                fill="none"
                stroke="#d81f26"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
              />
              <circle cx="280" cy="90" r="6" fill="#d81f26" opacity="0.6" />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-white/70 backdrop-blur flex items-center justify-center border border-white/60">
                <ChartIcon size={28} className="text-focus-red" />
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 left-2 bg-white rounded-2xl border border-border-gray shadow-lg p-4 w-40"
          >
            <div className="flex items-center gap-2 text-focus-red">
              <TrendingUp size={16} />
              <span className="text-xs font-semibold">O&apos;sish</span>
            </div>
            <p className="text-2xl font-extrabold mt-1">+200%</p>
            <p className="text-[11px] text-foreground/40">natija oshdi</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-16 right-0 bg-white rounded-2xl border border-border-gray shadow-lg p-4 w-40"
          >
            <div className="flex items-center gap-2 text-foreground/70">
              <Users size={16} />
              <span className="text-xs font-semibold">Mijozlar</span>
            </div>
            <p className="text-2xl font-extrabold mt-1">50+</p>
            <p className="text-[11px] text-foreground/40">mamnun mijoz</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-4 left-6 bg-white rounded-2xl border border-border-gray shadow-lg p-3.5 flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-focus-red/10 text-focus-red flex items-center justify-center">
              <Target size={16} />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">120+</p>
              <p className="text-[10px] text-foreground/40 mt-0.5">loyiha</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
