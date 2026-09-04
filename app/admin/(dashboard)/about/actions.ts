"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateAboutContent(id: string, formData: FormData) {
  await prisma.siteSettings.update({
    where: { id },
    data: {
      heroTitle: String(formData.get("heroTitle") || ""),
      heroSubtitle: String(formData.get("heroSubtitle") || ""),
      heroCtaText: String(formData.get("heroCtaText") || ""),
      heroCtaSecond: String(formData.get("heroCtaSecond") || ""),
      aboutTitle: String(formData.get("aboutTitle") || ""),
      aboutSubtitle: String(formData.get("aboutSubtitle") || "") || null,
      aboutText: String(formData.get("aboutText") || ""),
      aboutImage: String(formData.get("aboutImage") || "") || null,
      contactTitle: String(formData.get("contactTitle") || ""),
      contactText: String(formData.get("contactText") || "") || null,
    },
  });
  revalidatePath("/admin/about");
  revalidatePath("/");
  redirect("/admin/about?toast=updated");
}
