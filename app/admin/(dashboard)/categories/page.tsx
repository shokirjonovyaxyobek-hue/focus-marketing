import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Toast } from "@/components/admin/Toast";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { deleteCategory } from "./actions";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.projectCategory.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { projects: true } } },
  });

  return (
    <div className="space-y-6">
      <Suspense>
        <Toast />
      </Suspense>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Loyiha kategoriyalari</h1>
          <p className="text-sm text-foreground/50 mt-1">Loyihalar filtri uchun kategoriyalar</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 bg-focus-red hover:bg-focus-red-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} /> Yangi kategoriya
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border-gray overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-gray text-left text-xs text-foreground/40 uppercase tracking-wide">
              <th className="px-5 py-3 font-medium">Nomi</th>
              <th className="px-5 py-3 font-medium">Loyihalar soni</th>
              <th className="px-5 py-3 font-medium">Holat</th>
              <th className="px-5 py-3 font-medium text-right">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-border-gray last:border-0">
                <td className="px-5 py-3.5 font-medium text-foreground">{c.name}</td>
                <td className="px-5 py-3.5 text-foreground/50">{c._count.projects}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      c.active ? "bg-green-50 text-green-700" : "bg-surface-gray text-foreground/50"
                    }`}
                  >
                    {c.active ? "Faol" : "Nofaol"}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/categories/${c.id}/edit`} className="text-xs font-semibold text-focus-red hover:underline px-2">
                      Tahrirlash
                    </Link>
                    <ConfirmDeleteButton
                      itemLabel={c.name}
                      action={async () => {
                        "use server";
                        await deleteCategory(c.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-foreground/40">
                  Hozircha kategoriyalar yo&apos;q.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
