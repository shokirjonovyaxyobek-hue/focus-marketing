import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

type Stat = {
  id: string;
  label: string;
  value: number;
  suffix: string | null;
};

export function Statistics({ stats }: { stats: Stat[] }) {
  if (stats.length === 0) return null;

  return (
    <section className="py-16 lg:py-20 border-y border-border-gray bg-surface-gray/50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <RevealItem key={stat.id} className="text-center lg:text-left">
              <p className="text-4xl lg:text-5xl font-extrabold text-focus-red tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix ?? ""} />
              </p>
              <p className="mt-2 text-sm text-foreground/60 font-medium">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
