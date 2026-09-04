"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createStatistic(formData: FormData) {
  await prisma.statistic.create({
    data: {
      label: String(formData.get("label")),
      value: Number(formData.get("value")),
      suffix: String(formData.get("suffix") || ""),
      order: Number(formData.get("order") || 0),
      active: formData.get("active") === "true",
    },
  });
  revalidatePath("/admin/statistics");
  revalidatePath("/");
  redirect("/admin/statistics?toast=created");
}

export async function updateStatistic(id: string, formData: FormData) {
  await prisma.statistic.update({
    where: { id },
    data: {
      label: String(formData.get("label")),
      value: Number(formData.get("value")),
      suffix: String(formData.get("suffix") || ""),
      order: Number(formData.get("order") || 0),
      active: formData.get("active") === "true",
    },
  });
  revalidatePath("/admin/statistics");
  revalidatePath("/");
  redirect("/admin/statistics?toast=updated");
}

export async function deleteStatistic(id: string) {
  "use server";
  await prisma.statistic.delete({ where: { id } });
  revalidatePath("/admin/statistics");
  revalidatePath("/");
}
