import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { Toast } from "@/components/admin/Toast";
import { LeadRow } from "./LeadRowClient";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const unreadCount = leads.filter((l) => !l.isRead).length;

  return (
    <div className="space-y-6">
      <Suspense>
        <Toast />
      </Suspense>

      <div>
        <h1 className="text-2xl font-bold text-foreground">Murojaatlar</h1>
        <p className="text-sm text-foreground/50 mt-1">
          Hamkorlik formasidan kelgan murojaatlar
          {unreadCount > 0 && (
            <span className="ml-2 text-focus-red font-semibold">({unreadCount} ta o&apos;qilmagan)</span>
          )}
        </p>
      </div>

      <div className="space-y-3">
        {leads.map((lead) => (
          <LeadRow
            key={lead.id}
            lead={{
              id: lead.id,
              name: lead.name,
              phone: lead.phone,
              instagram: lead.instagram,
              message: lead.message,
              status: lead.status,
              isRead: lead.isRead,
              createdAt: lead.createdAt.toISOString(),
            }}
          />
        ))}
        {leads.length === 0 && (
          <p className="text-center text-foreground/40 py-16">Hozircha murojaatlar yo&apos;q.</p>
        )}
      </div>
    </div>
  );
}

