"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

type Service = {
  id: string;
  number: number;
  icon: string | null;
  title: string;
  description: string;
};

function ServiceIcon({ name }: { name: string | null }) {
  const IconComp = (name && (Icons as unknown as Record<string, Icons.LucideIcon>)[name]) || Icons.Sparkles;
  return <IconComp size={22} strokeWidth={2} />;
}

export function Services({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="py-14 lg:py-20 bg-surface-gray/50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground text-center">
            Xizmatlarimiz
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <RevealItem key={service.id}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full bg-white rounded-2xl border border-border-gray p-7 hover:border-focus-red/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-shadow"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-focus-red/8 text-focus-red flex items-center justify-center">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <span className="text-2xl font-extrabold text-foreground/10">
                    {String(service.number).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm text-foreground/55 leading-relaxed">{service.description}</p>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
