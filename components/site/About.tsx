import Image from "next/image";
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
  return (
    <section id="about" className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal direction="left">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-surface-gray border border-border-gray">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain p-8"
              />
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
          <Reveal delay={0.1}>
            <h2 className="text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-foreground leading-[1.1]">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-3 mb-6 h-1 w-14 rounded-full bg-focus-red" />
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-foreground/60 leading-relaxed text-[17px] max-w-lg">{text}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
