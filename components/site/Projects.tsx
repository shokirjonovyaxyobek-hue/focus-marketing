"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
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
  category: {
    id: string;
    name: string;
    slug: string;
  };
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

/* =========================
   ANIMATIONS
========================= */

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const textGroup: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const textItem: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================
   PROJECTS COMPONENT
========================= */

export function Projects({
  projects,
  categories,
}: {
  projects: Project[];
  categories: Category[];
}) {
  const [active, setActive] = useState<string>("all");

  /* =========================
     FILTER PROJECTS
  ========================= */

  const filtered = useMemo(() => {
    if (active === "all") {
      return projects;
    }

    return projects.filter(
      (project) => project.category.slug === active
    );
  }, [projects, active]);

  /* =========================
     EMPTY PROJECTS
  ========================= */

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="py-10 lg:py-14"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* =========================
            SECTION TITLE
        ========================= */}

        <Reveal>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground text-center">
            Loyihalarimiz
          </h2>
        </Reveal>

        {/* =========================
            CATEGORY FILTER
        ========================= */}

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap justify-center gap-2">

            {/* ALL BUTTON */}
            <button
              type="button"
              onClick={() => setActive("all")}
              className={`
                text-sm
                font-semibold
                px-4
                py-2
                rounded-full
                transition-colors
                ${
                  active === "all"
                    ? "bg-focus-red text-white"
                    : "bg-surface-gray text-foreground/60 hover:text-foreground"
                }
              `}
            >
              Barchasi
            </button>

            {/* CATEGORY BUTTONS */}
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActive(category.slug)}
                className={`
                  text-sm
                  font-semibold
                  px-4
                  py-2
                  rounded-full
                  transition-colors
                  ${
                    active === category.slug
                      ? "bg-focus-red text-white"
                      : "bg-surface-gray text-foreground/60 hover:text-foreground"
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* =========================
            PROJECT GRID
        ========================= */}

        <motion.div
          layout
          className="mt-10 grid lg:grid-cols-2 gap-5"
        >
          <AnimatePresence mode="popLayout">

            {filtered.map((project, index) => {

              /* =========================
                 PROJECT STATS
              ========================= */

              const stats = [
                {
                  label: "Natija",
                  value: project.resultNumber,
                },
                {
                  label: "Muddat",
                  value: project.duration,
                },
                {
                  label: "Auditoriya",
                  value: project.audience,
                },
              ].filter(
                (
                  stat
                ): stat is {
                  label: string;
                  value: string;
                } => Boolean(stat.value)
              );

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  variants={cardVariants}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="relative group/card"
                >

                  {/* =========================
                      RED GLOW
                  ========================= */}

                  <motion.div
                    aria-hidden="true"
                    className="
                      absolute
                      -inset-3
                      rounded-[1.75rem]
                      bg-focus-red/10
                      blur-2xl
                      opacity-0
                      group-hover/card:opacity-100
                      transition-opacity
                      duration-500
                      -z-10
                    "
                    animate={{
                      scale: [1, 1.04, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* =========================
                      PROJECT LINK
                  ========================= */}

                  <Link
                    href={`/projects/${project.slug}`}
                    className="
                      group
                      flex
                      items-stretch
                      gap-4
                      bg-white
                      rounded-2xl
                      border
                      border-border-gray
                      p-4
                      hover:border-focus-red/25
                      hover:shadow-[0_20px_50px_rgba(216,31,38,0.12)]
                      transition-all
                      duration-300
                    "
                  >

                    {/* =========================
                        PROJECT IMAGE
                    ========================= */}

                    <motion.div
                      whileHover={{
                        scale: 1.03,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="
                        relative
                        w-24
                        sm:w-28
                        aspect-square
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        border
                        border-border-gray
                        bg-surface-gray
                        p-2
                      "
                    >
                      <Image
                        src={project.mainImage}
                        alt={project.name}
                        fill
                        className="
                          object-contain
                          p-1
                          transition-transform
                          duration-500
                          group-hover:scale-[1.08]
                        "
                        sizes="112px"
                      />
                    </motion.div>

                    {/* =========================
                        PROJECT TEXT
                    ========================= */}

                    <motion.div
                      variants={textGroup}
                      initial="hidden"
                      whileInView="show"
                      viewport={{
                        once: true,
                        amount: 0.6,
                      }}
                      className="
                        flex-1
                        min-w-0
                        flex
                        flex-col
                        justify-center
                        py-1
                      "
                    >

                      {/* CATEGORY */}
                      <motion.span
                        variants={textItem}
                        className="
                          text-[10px]
                          font-bold
                          tracking-wider
                          text-focus-red
                          uppercase
                        "
                      >
                        {project.category.name}
                      </motion.span>

                      {/* PROJECT NAME */}
                      <motion.h3
                        variants={textItem}
                        className="
                          mt-1
                          text-base
                          sm:text-lg
                          font-extrabold
                          text-foreground
                          uppercase
                          leading-snug
                        "
                      >
                        {project.name}
                      </motion.h3>

                      {/* DESCRIPTION */}
                      <motion.p
                        variants={textItem}
                        className="
                          mt-1.5
                          text-sm
                          text-foreground/55
                          leading-relaxed
                          line-clamp-2
                        "
                      >
                        {project.shortDescription}
                      </motion.p>

                    </motion.div>

                    {/* =========================
                        STATS BOX
                    ========================= */}

                    <motion.div
                      variants={textGroup}
                      initial="hidden"
                      whileInView="show"
                      viewport={{
                        once: true,
                        amount: 0.6,
                      }}
                      whileHover={{
                        scale: 1.03,
                      }}
                      className="
                        shrink-0
                        w-24
                        sm:w-28
                        rounded-xl
                        border
                        border-border-gray
                        bg-surface-gray/50
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-2.5
                        text-center
                        px-2
                        py-3
                        transition-colors
                        group-hover:border-focus-red/20
                        group-hover:bg-focus-red/[0.03]
                      "
                    >

                      {stats.length > 0 ? (

                        stats
                          .slice(0, 3)
                          .map((stat) => (
                            <motion.div
                              key={stat.label}
                              variants={textItem}
                            >

                              {/* VALUE */}
                              <p
                                className="
                                  text-[13px]
                                  font-extrabold
                                  text-foreground
                                  leading-none
                                "
                              >
                                {stat.value}
                              </p>

                              {/* LABEL */}
                              <p
                                className="
                                  text-[9px]
                                  text-foreground/40
                                  mt-1
                                  uppercase
                                  tracking-wide
                                "
                              >
                                {stat.label}
                              </p>

                            </motion.div>
                          ))

                      ) : (

                        /* =========================
                           NO STATS
                        ========================= */

                        <>
                          <motion.p
                            variants={textItem}
                            className="
                              text-[10px]
                              text-foreground/40
                              leading-tight
                            "
                          >
                            Loyiha
                          </motion.p>

                          <motion.p
                            variants={textItem}
                            className="
                              text-[10px]
                              text-foreground/40
                              leading-tight
                            "
                          >
                            haqida
                          </motion.p>
                        </>

                      )}

                    </motion.div>

                  </Link>
                </motion.div>
              );
            })}

          </AnimatePresence>
        </motion.div>

        {/* =========================
            EMPTY FILTER RESULT
        ========================= */}

        {filtered.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              py-16
              text-center
              text-foreground/50
            "
          >
            Bu kategoriyada hozircha loyihalar mavjud emas.
          </motion.div>
        )}

      </div>
    </section>
  );
}