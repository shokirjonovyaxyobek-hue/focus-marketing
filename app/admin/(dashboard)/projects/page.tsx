import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Plus, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Toast } from "@/components/admin/Toast";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { deleteProject } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    include: { category: true },
  });

  return (
    <div className="space-y-6">
      <Suspense>
        <Toast />
      </Suspense>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Loyihalar</h1>
          <p className="text-sm text-foreground/50 mt-1">Portfolio loyihalari ro&apos;yxati</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-focus-red hover:bg-focus-red-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} /> Yangi loyiha
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-border-gray overflow-hidden">
            <div className="relative aspect-video bg-surface-gray p-2">
              {p.mainImage && <Image src={p.mainImage} alt={p.name} fill className="object-contain" />}
              {p.featured && (
                <span className="absolute top-2 left-2 bg-white/95 text-focus-red text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Star size={11} fill="currentColor" /> Tanlangan
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs text-focus-red font-semibold uppercase tracking-wide">{p.category.name}</p>
              <p className="font-semibold text-foreground mt-1 truncate">{p.name}</p>
              <div className="flex items-center justify-between mt-3">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    p.active ? "bg-green-50 text-green-700" : "bg-surface-gray text-foreground/50"
                  }`}
                >
                  {p.active ? "Faol" : "Nofaol"}
                </span>
                <div className="flex items-center gap-1">
                  <Link href={`/admin/projects/${p.id}/edit`} className="text-xs font-semibold text-focus-red hover:underline px-2">
                    Tahrirlash
                  </Link>
                  <ConfirmDeleteButton
                    itemLabel={p.name}
                    action={async () => {
                      "use server";
                      await deleteProject(p.id);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="col-span-full text-center text-foreground/40 py-10">Hozircha loyihalar yo&apos;q.</p>
        )}
      </div>
    </div>
  );
}
