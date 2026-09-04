import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Toast } from "@/components/admin/Toast";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { deleteStatistic } from "./actions";

export const dynamic = "force-dynamic";

export default async function StatisticsPage() {
  const stats = await prisma.statistic.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <Suspense>
        <Toast />
      </Suspense>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Statistikalar</h1>
          <p className="text-sm text-foreground/50 mt-1">Bosh sahifadagi raqamli ko&apos;rsatkichlar</p>
        </div>
        <Link
          href="/admin/statistics/new"
          className="inline-flex items-center gap-2 bg-focus-red hover:bg-focus-red-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} /> Yangi statistika
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border-gray overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-gray text-left text-xs text-foreground/40 uppercase tracking-wide">
              <th className="px-5 py-3 font-medium">Qiymat</th>
              <th className="px-5 py-3 font-medium">Nomi</th>
              <th className="px-5 py-3 font-medium">Tartib</th>
              <th className="px-5 py-3 font-medium">Holat</th>
              <th className="px-5 py-3 font-medium text-right">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((s) => (
              <tr key={s.id} className="border-b border-border-gray last:border-0">
                <td className="px-5 py-3.5 font-bold text-focus-red">
                  {s.value}
                  {s.suffix}
                </td>
                <td className="px-5 py-3.5 text-foreground">{s.label}</td>
                <td className="px-5 py-3.5 text-foreground/50">{s.order}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      s.active ? "bg-green-50 text-green-700" : "bg-surface-gray text-foreground/50"
                    }`}
                  >
                    {s.active ? "Faol" : "Nofaol"}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/statistics/${s.id}/edit`}
                      className="text-xs font-semibold text-focus-red hover:underline px-2"
                    >
                      Tahrirlash
                    </Link>
                    <ConfirmDeleteButton
                      itemLabel={s.label}
                      action={async () => {
                        "use server";
                        await deleteStatistic(s.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {stats.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-foreground/40">
                  Hozircha statistikalar yo&apos;q.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
