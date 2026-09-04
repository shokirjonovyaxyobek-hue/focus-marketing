"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { LeadStatus } from "@prisma/client";

export async function updateLeadStatus(id: string, status: LeadStatus) {
  "use server";
  await prisma.lead.update({ where: { id }, data: { status, isRead: true } });
  revalidatePath("/admin/leads");
}

export async function markLeadRead(id: string) {
  "use server";
  await prisma.lead.update({ where: { id }, data: { isRead: true } });
  revalidatePath("/admin/leads");
}

export async function deleteLead(id: string) {
  "use server";
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}
