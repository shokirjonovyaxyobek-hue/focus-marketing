import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe } from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/ui/Reveal";
import type { Metadata } from "next";

async function getProject(slug: string) {
  return prisma.project.findUnique({
    where: { slug, active: true },
    include: { category: true, images: { orderBy: { order: "asc" } } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.shortDescription,
    openGraph: { images: [project.mainImage] },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  const settings = await prisma.siteSettings.findFirst();

  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 lg:pt-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/50 hover:text-focus-red transition-colors"
          >
            <ArrowLeft size={16} /> Loyihalarga qaytish
          </Link>

          <Reveal>
            <div className="mt-6 relative aspect-[16/9] rounded-3xl overflow-hidden bg-surface-gray p-4">
              <Image src={project.mainImage} alt={project.name} fill priority className="object-contain" />
            </div>
          </Reveal>

          <div className="mt-8 grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Reveal>
                <span className="inline-block text-xs font-bold tracking-wide text-focus-red bg-focus-red/8 px-3 py-1.5 rounded-full uppercase">
                  {project.category.name}
                </span>
                <h1 className="mt-4 text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
                  {project.name}
                </h1>
                <p className="mt-4 text-foreground/60 leading-relaxed">{project.shortDescription}</p>
                {project.fullDescription && (
                  <div className="mt-6 text-foreground/70 leading-relaxed whitespace-pre-line">
                    {project.fullDescription}
                  </div>
                )}
              </Reveal>

              {project.images.length > 0 && (
                <Reveal delay={0.1}>
                  <div className="mt-10 grid sm:grid-cols-2 gap-4">
                    {project.images.map((img) => (
                      <div key={img.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface-gray p-2">
                        <Image src={img.url} alt={project.name} fill className="object-contain" />
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>

            <Reveal direction="left" className="lg:col-span-1">
              <div className="bg-surface-gray rounded-2xl p-6 sticky top-28 space-y-5">
                {project.result && (
                  <div>
                    <p className="text-xs font-medium text-foreground/45 uppercase tracking-wide">Natija</p>
                    <p className="mt-1 font-bold text-focus-red">{project.result}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {project.resultNumber && (
                    <div>
                      <p className="text-lg font-extrabold text-foreground">{project.resultNumber}</p>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <p className="text-lg font-extrabold text-foreground">{project.duration}</p>
                    </div>
                  )}
                  {project.audience && (
                    <div>
                      <p className="text-lg font-extrabold text-foreground">{project.audience}</p>
                    </div>
                  )}
                </div>

                {(project.instagramUrl || project.websiteUrl) && (
                  <div className="pt-4 border-t border-border-gray space-y-2">
                    {project.instagramUrl && (
                      <a
                        href={project.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-focus-red transition-colors"
                      >
                        <InstagramIcon size={16} /> Instagram
                      </a>
                    )}
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-focus-red transition-colors"
                      >
                        <Globe size={16} /> Veb-sayt
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer
        footerText={settings?.footerText ?? null}
        instagram={settings?.instagram ?? null}
        telegram={settings?.telegram ?? null}
      />
    </>
  );
}
