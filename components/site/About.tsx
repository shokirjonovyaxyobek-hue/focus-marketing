"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

export function About({
  title,
  subtitle,
  text,
  image,
}: {
  title: string;
  subtitle: string | null;
  text: string;
  image: string | null;
}) {
  const titleWords = title.split(" ");

  return (
    <section id="about" className="py-10 lg:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal direction="left" duration={0.75}>
          <div className="relative">
            <motion.div
              aria-hidden
              className="absolute -inset-4 rounded-[2.5rem] bg-focus-red/[0.06] blur-2xl"
              animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-surface-gray border border-border-gray"
            >
              {image ? (
                <Image src={image} alt={title} fill className="object-contain p-8" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <Image
                    src="/focus-logo.png"
                    alt="FOCUS Marketing"
                    width={160}
                    height={160}
                    className="w-full h-full max-w-[160px] max-h-[160px] object-contain opacity-25"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            {subtitle && (
              <span className="inline-block text-xs font-semibold tracking-wide text-focus-red bg-focus-red/8 px-3 py-1.5 rounded-full mb-5">
                {subtitle}
              </span>
            )}
          </Reveal>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
            className="text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-foreground leading-[1.1]"
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-2.5"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 mb-6 h-1 rounded-full bg-focus-red"
          />

          <Reveal delay={0.3}>
            <p className="text-foreground/60 leading-relaxed text-[17px] max-w-lg">{text}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
