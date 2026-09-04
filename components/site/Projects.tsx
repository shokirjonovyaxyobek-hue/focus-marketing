"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
    <section id="projects" className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground text-center">
            Loyihalarimiz
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
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

        <motion.div layout className="mt-12 grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block bg-white rounded-3xl border border-border-gray overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-gray p-3">
                    <Image
                      src={project.mainImage}
                      alt={project.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[11px] font-bold tracking-wide text-focus-red px-3 py-1.5 rounded-full uppercase">
                      {project.category.name}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
                      <span className="shrink-0 w-9 h-9 rounded-full border border-border-gray flex items-center justify-center text-foreground/40 group-hover:bg-focus-red group-hover:text-white group-hover:border-focus-red transition-colors">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-foreground/55 leading-relaxed">{project.shortDescription}</p>

                    {project.result && (
                      <p className="mt-3 text-sm font-semibold text-focus-red">Natija: {project.result}</p>
                    )}

                    {(project.resultNumber || project.duration || project.audience) && (
                      <div className="mt-5 pt-5 border-t border-border-gray flex flex-wrap gap-x-6 gap-y-2">
                        {project.resultNumber && (
                          <div>
                            <p className="text-sm font-bold text-foreground">{project.resultNumber}</p>
                          </div>
                        )}
                        {project.duration && (
                          <div>
                            <p className="text-sm font-bold text-foreground">{project.duration}</p>
                          </div>
                        )}
                        {project.audience && (
                          <div>
                            <p className="text-sm font-bold text-foreground">{project.audience}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
