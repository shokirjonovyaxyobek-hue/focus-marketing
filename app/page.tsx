import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Statistics } from "@/components/site/Statistics";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { Team } from "@/components/site/Team";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const revalidate = 60;

async function getHomeData() {
  const [settings, stats, services, categories, projects, team] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.statistic.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.projectCategory.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.project.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      include: { category: true },
    }),
    prisma.teamMember.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
  ]);

  return { settings, stats, services, categories, projects, team };
}

export default async function Home() {
  const { settings, stats, services, categories, projects, team } = await getHomeData();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero
          title={settings?.heroTitle ?? "Biznesingizni keyingi bosqichga olib chiqamiz"}
          subtitle={
            settings?.heroSubtitle ??
            "Strategiya, kreativ va natijaga yo'naltirilgan marketing yechimlari bilan brendingizni kuchaytiramiz."
          }
          ctaText={settings?.heroCtaText ?? "Xizmatlarimiz bilan tanishing"}
          ctaSecond={settings?.heroCtaSecond ?? "Biz haqimizda"}
        />
        <Statistics stats={stats} />
        <About
          title={settings?.aboutTitle ?? "Biz haqimizda"}
          subtitle={settings?.aboutSubtitle ?? null}
          text={
            settings?.aboutText ??
            "FOCUS Marketing — brendlarni raqamli dunyoda kuchaytiruvchi marketing agentligi."
          }
          image={settings?.aboutImage ?? null}
        />
        <Services services={services} />
        <Projects projects={projects} categories={categories} />
        <Team members={team} />
        <Contact
          title={settings?.contactTitle ?? "Hamkorlik uchun"}
          text={settings?.contactText ?? null}
          phone={settings?.phone ?? null}
          instagram={settings?.instagram ?? null}
        />
      </main>
      <Footer
        footerText={settings?.footerText ?? null}
        instagram={settings?.instagram ?? null}
        telegram={settings?.telegram ?? null}
      />
    </>
  );
}
