"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Ismingizni to'liq kiriting"),
  phone: z
    .string()
    .trim()
    .regex(/^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/, "Telefon raqamni +998 XX XXX XX XX formatida kiriting"),
  instagram: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export type LeadFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function createLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    instagram: formData.get("instagram")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  };

  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      if (issue.path[0]) fieldErrors[String(issue.path[0])] = issue.message;
    }
    return { success: false, fieldErrors };
  }

  try {
    await prisma.lead.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        instagram: parsed.data.instagram || null,
        message: parsed.data.message || null,
      },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring." };
  }
}
