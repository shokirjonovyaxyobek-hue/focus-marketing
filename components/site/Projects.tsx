"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

type Project = {
  id: string;
  name: string;
  slug: string;
  mainImage: string;
  shortDescription: string;
  result: string | null;
  resultNumber: string | null;
  duration: string | null;
  audience: string | null;
  category: { id: string; name: string; slug: string };
};

type Category = { id: string; name: string; slug: string };

export function Projects({ projects, categories }: { projects: Project[]; categories: Category[] }) {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((p) => p.category.slug === active);
  }, [projects, active]);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground text-center">
            Loyihalarimiz
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActive("all")}
              className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                active === "all"
                  ? "bg-focus-red text-white"
                  : "bg-surface-gray text-foreground/60 hover:text-foreground"
              }`}
            >
              Barchasi
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.slug)}
                className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                  active === c.slug
                    ? "bg-focus-red text-white"
                    : "bg-surface-gray text-foreground/60 hover:text-foreground"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid lg:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const stats = [
                { label: "Natija", value: project.resultNumber },
                { label: "Muddat", value: project.duration },
                { label: "Auditoriya", value: project.audience },
              ].filter((s) => s.value);

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex items-stretch gap-4 bg-white rounded-2xl border border-border-gray p-4 hover:border-focus-red/25 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all"
                  >
                    {/* Rasm qutisi — shablondagi "loyiha rasmi" */}
                    <div className="relative w-24 sm:w-28 aspect-square shrink-0 overflow-hidden rounded-xl border border-border-gray bg-surface-gray p-2">
                      <Image
                        src={project.mainImage}
                        alt={project.name}
                        fill
                        className="object-contain p-1 transition-transform duration-500 group-hover:scale-[1.06]"
                        sizes="112px"
                      />
                    </div>

                    {/* Matn — nima qilganimiz / LOYIHA NOMI / tavsif */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
                      <span className="text-[10px] font-bold tracking-wider text-focus-red uppercase">
                        {project.category.name}
                      </span>
                      <h3 className="mt-1 text-base sm:text-lg font-extrabold text-foreground uppercase leading-snug">
                        {project.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-foreground/55 leading-relaxed line-clamp-2">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Natija qutisi — shablondagi "loyiha haqida sotuv natija obunachi" */}
                    <div className="shrink-0 w-24 sm:w-28 rounded-xl border border-border-gray bg-surface-gray/50 flex flex-col items-center justify-center gap-2.5 text-center px-2 py-3">
                      {stats.length > 0 ? (
                        stats.slice(0, 3).map((s) => (
                          <div key={s.label}>
                            <p className="text-[13px] font-extrabold text-foreground leading-none">{s.value}</p>
                            <p className="text-[9px] text-foreground/40 mt-1 uppercase tracking-wide">{s.label}</p>
                          </div>
                        ))
                      ) : (
                        <>
                          <p className="text-[10px] text-foreground/40 leading-tight">Loyiha</p>
                          <p className="text-[10px] text-foreground/40 leading-tight">haqida</p>
                        </>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}