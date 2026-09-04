"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";

type Member = {
  id: string;
  fullName: string;
  position: string;
  experience: string | null;
  photo: string | null;
  instagram: string | null;
};

export function Team({ members }: { members: Member[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (members.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % members.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [members.length]);

  if (members.length === 0) return null;

  const getPos = (i: number) => {
    const diff = (i - index + members.length) % members.length;
    if (diff === 0) return "center";
    if (diff === 1 || diff === 1 - members.length) return "right";
    if (diff === members.length - 1 || diff === -1) return "left";
    return "hidden";
  };

  return (
    <section id="team" className="py-14 lg:py-20 bg-surface-gray/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground text-center">
            Jamoamiz
          </h2>
        </Reveal>

        <div className="relative mt-14 h-[420px] flex items-center justify-center">
          <button
            onClick={() => setIndex((i) => (i - 1 + members.length) % members.length)}
            className="absolute left-0 lg:left-8 z-20 w-10 h-10 rounded-full bg-white border border-border-gray flex items-center justify-center hover:border-focus-red hover:text-focus-red transition-colors"
            aria-label="Oldingi"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="relative w-full max-w-3xl h-full">
            <AnimatePresence initial={false}>
              {members.map((member, i) => {
                const pos = getPos(i);
                if (pos === "hidden") return null;

                const config = {
                  center: { x: "0%", scale: 1, opacity: 1, zIndex: 10 },
                  left: { x: "-62%", scale: 0.78, opacity: 0.4, zIndex: 5 },
                  right: { x: "62%", scale: 0.78, opacity: 0.4, zIndex: 5 },
                }[pos];

                return (
                  <motion.div
                    key={member.id}
                    animate={config}
                    initial={false}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div
                      className={`w-64 bg-white rounded-3xl p-7 text-center border transition-colors ${
                        pos === "center"
                          ? "border-focus-red/25 shadow-[0_20px_50px_rgba(216,31,38,0.12)]"
                          : "border-border-gray"
                      }`}
                    >
                      <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden bg-surface-gray border-2 border-white shadow-sm ring-1 ring-border-gray">
                        {member.photo ? (
                          <Image src={member.photo} alt={member.fullName} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-foreground/20">
                            <User size={36} />
                          </div>
                        )}
                      </div>

                      <h3 className="mt-5 font-bold text-foreground text-[15px]">{member.fullName}</h3>

                      <span className="inline-block mt-1.5 text-[11px] font-semibold tracking-wide uppercase text-focus-red bg-focus-red/8 px-2.5 py-1 rounded-full">
                        {member.position}
                      </span>

                      {member.experience && (
                        <p className="text-xs text-foreground/40 mt-2">{member.experience}</p>
                      )}

                      {member.instagram && (
                        <div className="mt-4 flex justify-center">
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-surface-gray flex items-center justify-center text-foreground/50 hover:text-focus-red hover:bg-focus-red/8 transition-colors"
                            aria-label={`${member.fullName} Instagram`}
                          >
                            <InstagramIcon size={16} />
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIndex((i) => (i + 1) % members.length)}
            className="absolute right-0 lg:right-8 z-20 w-10 h-10 rounded-full bg-white border border-border-gray flex items-center justify-center hover:border-focus-red hover:text-focus-red transition-colors"
            aria-label="Keyingi"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
