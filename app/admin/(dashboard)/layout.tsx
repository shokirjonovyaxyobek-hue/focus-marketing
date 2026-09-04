import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Info,
  Briefcase,
  FolderKanban,
  Tags,
  Users,
  ChartColumn,
  Inbox,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/about", label: "Biz haqimizda", icon: Info },
  { href: "/admin/services", label: "Xizmatlar", icon: Briefcase },
  { href: "/admin/projects", label: "Loyihalar", icon: FolderKanban },
  { href: "/admin/categories", label: "Kategoriyalar", icon: Tags },
  { href: "/admin/team", label: "Jamoa", icon: Users },
  { href: "/admin/statistics", label: "Statistikalar", icon: ChartColumn },
  { href: "/admin/leads", label: "Murojaatlar", icon: Inbox },
  { href: "/admin/settings", label: "Sozlamalar", icon: Settings },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-surface-gray flex">
      <aside className="w-64 shrink-0 bg-white border-r border-border-gray flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border-gray">
          <span className="text-lg font-extrabold tracking-tight">
            FOCUS<span className="text-focus-red">.</span>
          </span>
          <span className="ml-2 text-xs text-foreground/40 font-medium">Admin</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/70 hover:bg-surface-gray hover:text-focus-red transition-colors"
              >
                <Icon size={18} strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border-gray">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/60 hover:bg-focus-red/5 hover:text-focus-red transition-colors"
            >
              <LogOut size={18} strokeWidth={2} />
              Chiqish
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-border-gray flex items-center justify-end px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-focus-red/10 text-focus-red flex items-center justify-center text-sm font-semibold">
              {session.user?.name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <span className="text-sm font-medium text-foreground/80">
              {session.user?.name ?? session.user?.email}
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
