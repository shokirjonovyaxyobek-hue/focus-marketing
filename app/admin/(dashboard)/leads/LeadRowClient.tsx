"use client";

import { useState, useTransition } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import {
  updateLeadStatus,
  markLeadRead,
  deleteLead,
} from "@/app/admin/(dashboard)/leads/actions";

type LeadStatus = "NEW" | "IN_PROGRESS" | "CONTACTED" | "COMPLETED";

const statusLabel: Record<LeadStatus, string> = {
  NEW: "Yangi",
  IN_PROGRESS: "Jarayonda",
  CONTACTED: "Bog'lanildi",
  COMPLETED: "Yakunlandi",
};

const statusColor: Record<LeadStatus, string> = {
  NEW: "bg-focus-red/8 text-focus-red",
  IN_PROGRESS: "bg-amber-50 text-amber-700",
  CONTACTED: "bg-blue-50 text-blue-700",
  COMPLETED: "bg-green-50 text-green-700",
};

export function LeadRow({
  lead,
}: {
  lead: {
    id: string;
    name: string;
    phone: string;
    instagram: string | null;
    message: string | null;
    status: LeadStatus;
    isRead: boolean;
    createdAt: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [, startTransition] = useTransition();

  const toggle = () => {
    setOpen((o) => !o);

    if (!lead.isRead) {
      startTransition(() => {
        markLeadRead(lead.id);
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-border-gray overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          {!lead.isRead && (
            <span className="w-2 h-2 rounded-full bg-focus-red shrink-0" />
          )}

          <div className="min-w-0">
            <p className="font-semibold text-foreground truncate">
              {lead.name}
            </p>
            <p className="text-xs text-foreground/50">{lead.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[status]}`}
          >
            {statusLabel[status]}
          </span>

          <span className="text-xs text-foreground/40 hidden sm:block">
            {new Date(lead.createdAt).toLocaleDateString("uz-UZ")}
          </span>

          {open ? (
            <ChevronUp size={16} className="text-foreground/40" />
          ) : (
            <ChevronDown size={16} className="text-foreground/40" />
          )}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-border-gray pt-4 space-y-3">
          {lead.instagram && (
            <p className="text-sm text-foreground/70">
              <span className="text-foreground/40">Instagram:</span>{" "}
              {lead.instagram}
            </p>
          )}

          {lead.message && (
            <p className="text-sm text-foreground/70 leading-relaxed">
              <span className="text-foreground/40 block mb-1">
                Xabar:
              </span>{" "}
              {lead.message}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <select
              value={status}
              onChange={(e) => {
                const next = e.target.value as LeadStatus;
                setStatus(next);

                startTransition(() => {
                  updateLeadStatus(lead.id, next);
                });
              }}
              className="text-sm rounded-lg border border-border-gray px-3 py-2 outline-none focus:border-focus-red"
            >
              {(Object.keys(statusLabel) as LeadStatus[]).map((s) => (
                <option key={s} value={s}>
                  {statusLabel[s]}
                </option>
              ))}
            </select>

            <ConfirmDeleteButton
              itemLabel={lead.name}
              action={deleteLead.bind(null, lead.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
