import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Toast } from "@/components/admin/Toast";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { deleteService } from "./actions";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <Suspense>
        <Toast />
      </Suspense>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Xizmatlar</h1>
          <p className="text-sm text-foreground/50 mt-1">Sayt ko&apos;rsatadigan xizmatlar ro&apos;yxati</p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 bg-focus-red hover:bg-focus-red-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} /> Yangi xizmat
        </Link>
      </div>

      <div className="grid gap-3">
        {services.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-border-gray p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-lg font-extrabold text-foreground/15 w-8">
                {String(s.number).padStart(2, "0")}
              </span>
              <div>
                <p className="font-semibold text-foreground">{s.title}</p>
                <p className="text-sm text-foreground/50 mt-0.5 line-clamp-1 max-w-lg">{s.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  s.active ? "bg-green-50 text-green-700" : "bg-surface-gray text-foreground/50"
                }`}
              >
                {s.active ? "Faol" : "Nofaol"}
              </span>
              <Link href={`/admin/services/${s.id}/edit`} className="text-xs font-semibold text-focus-red hover:underline">
                Tahrirlash
              </Link>
              <ConfirmDeleteButton
                itemLabel={s.title}
                action={async () => {
                  "use server";
                  await deleteService(s.id);
                }}
              />
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <p className="text-center text-foreground/40 py-10">Hozircha xizmatlar yo&apos;q.</p>
        )}
      </div>
    </div>
  );
}
