"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateSiteSettings(id: string, formData: FormData) {
  await prisma.siteSettings.update({
    where: { id },
    data: {
      phone: String(formData.get("phone") || "") || null,
      instagram: String(formData.get("instagram") || "") || null,
      telegram: String(formData.get("telegram") || "") || null,
      email: String(formData.get("email") || "") || null,
      address: String(formData.get("address") || "") || null,
      workingHours: String(formData.get("workingHours") || "") || null,
      footerText: String(formData.get("footerText") || "") || null,
    },
  });
  revalidatePath("/admin/settings");
  revalidatePath("/");
  redirect("/admin/settings?toast=updated");
}
