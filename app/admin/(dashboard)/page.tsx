import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FolderKanban, Briefcase, Users, Inbox, MailOpen, CircleCheckBig } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  const [projects, services, team, leads, unreadLeads, activeProjects] =
    await Promise.all([
      prisma.project.count(),
      prisma.service.count(),
      prisma.teamMember.count(),
      prisma.lead.count(),
      prisma.lead.count({ where: { isRead: false } }),
      prisma.project.count({ where: { active: true } }),
    ]);

  const recentLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const recentProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { category: true },
  });

  return { projects, services, team, leads, unreadLeads, activeProjects, recentLeads, recentProjects };
}

const statusLabel: Record<string, string> = {
  NEW: "Yangi",
  IN_PROGRESS: "Jarayonda",
  CONTACTED: "Bog'lanildi",
  COMPLETED: "Yakunlandi",
};

export default async function AdminHomePage() {
  const stats = await getStats();

  const cards = [
    { label: "Jami loyihalar", value: stats.projects, icon: FolderKanban },
    { label: "Faol loyihalar", value: stats.activeProjects, icon: CircleCheckBig },
    { label: "Xizmatlar", value: stats.services, icon: Briefcase },
    { label: "Jamoa a'zolari", value: stats.team, icon: Users },
    { label: "Jami murojaatlar", value: stats.leads, icon: Inbox },
    { label: "O'qilmagan murojaatlar", value: stats.unreadLeads, icon: MailOpen },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-foreground/50 mt-1">Umumiy ko&apos;rsatkichlar va so&apos;nggi faoliyat</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="bg-white rounded-2xl border border-border-gray p-5 flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-focus-red/8 text-focus-red flex items-center justify-center shrink-0">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground leading-none">{c.value}</p>
                <p className="text-xs text-foreground/50 mt-1.5">{c.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-border-gray p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">So&apos;nggi murojaatlar</h2>
            <Link href="/admin/leads" className="text-xs text-focus-red font-medium hover:underline">
              Barchasi →
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentLeads.length === 0 && (
              <p className="text-sm text-foreground/40">Hozircha murojaatlar yo&apos;q.</p>
            )}
            {stats.recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between border-b border-border-gray last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{lead.name}</p>
                  <p className="text-xs text-foreground/50">{lead.phone}</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-gray text-foreground/60">
                  {statusLabel[lead.status]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border-gray p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">So&apos;nggi loyihalar</h2>
            <Link href="/admin/projects" className="text-xs text-focus-red font-medium hover:underline">
              Barchasi →
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentProjects.length === 0 && (
              <p className="text-sm text-foreground/40">Hozircha loyihalar yo&apos;q.</p>
            )}
            {stats.recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between border-b border-border-gray last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{project.name}</p>
                  <p className="text-xs text-foreground/50">{project.category.name}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${project.active ? "bg-green-50 text-green-700" : "bg-surface-gray text-foreground/50"}`}>
                  {project.active ? "Faol" : "Nofaol"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/projects/new" className="text-sm font-medium bg-focus-red text-white px-4 py-2.5 rounded-xl hover:bg-focus-red-dark transition-colors">
          + Yangi loyiha
        </Link>
        <Link href="/admin/services/new" className="text-sm font-medium bg-white border border-border-gray text-foreground px-4 py-2.5 rounded-xl hover:border-focus-red hover:text-focus-red transition-colors">
          + Yangi xizmat
        </Link>
        <Link href="/admin/team/new" className="text-sm font-medium bg-white border border-border-gray text-foreground px-4 py-2.5 rounded-xl hover:border-focus-red hover:text-focus-red transition-colors">
          + Jamoa a&apos;zosi
        </Link>
      </div>
    </div>
  );
}
