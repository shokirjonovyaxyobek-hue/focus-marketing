"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createService(formData: FormData) {
  await prisma.service.create({
    data: {
      number: Number(formData.get("number")),
      icon: String(formData.get("icon") || "") || null,
      title: String(formData.get("title")),
      description: String(formData.get("description")),
      order: Number(formData.get("order") || 0),
      active: formData.get("active") === "true",
    },
  });
  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services?toast=created");
}

export async function updateService(id: string, formData: FormData) {
  await prisma.service.update({
    where: { id },
    data: {
      number: Number(formData.get("number")),
      icon: String(formData.get("icon") || "") || null,
      title: String(formData.get("title")),
      description: String(formData.get("description")),
      order: Number(formData.get("order") || 0),
      active: formData.get("active") === "true",
    },
  });
  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services?toast=updated");
}

export async function deleteService(id: string) {
  "use server";
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/");
}
