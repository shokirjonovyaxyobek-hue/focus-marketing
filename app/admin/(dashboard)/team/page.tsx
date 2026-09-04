import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Plus, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Toast } from "@/components/admin/Toast";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { deleteTeamMember } from "./actions";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <Suspense>
        <Toast />
      </Suspense>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Jamoa</h1>
          <p className="text-sm text-foreground/50 mt-1">Jamoa a&apos;zolari ro&apos;yxati</p>
        </div>
        <Link
          href="/admin/team/new"
          className="inline-flex items-center gap-2 bg-focus-red hover:bg-focus-red-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} /> Jamoa a&apos;zosi
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl border border-border-gray p-5 flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-surface-gray shrink-0">
              {m.photo ? (
                <Image src={m.photo} alt={m.fullName} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-foreground/20">
                  <User size={22} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{m.fullName}</p>
              <p className="text-xs text-focus-red font-medium">{m.position}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Link href={`/admin/team/${m.id}/edit`} className="text-xs font-semibold text-foreground/50 hover:text-focus-red">
                  Tahrirlash
                </Link>
                <ConfirmDeleteButton
                  itemLabel={m.fullName}
                  action={async () => {
                    "use server";
                    await deleteTeamMember(m.id);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <p className="col-span-full text-center text-foreground/40 py-10">Hozircha jamoa a&apos;zolari yo&apos;q.</p>
        )}
      </div>
    </div>
  );
}
