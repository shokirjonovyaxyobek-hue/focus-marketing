"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function createCategory(formData: FormData) {
  const name = String(formData.get("name"));
  await prisma.projectCategory.create({
    data: {
      name,
      slug: slugify(name) + "-" + Math.random().toString(36).slice(2, 6),
      order: Number(formData.get("order") || 0),
      active: formData.get("active") === "true",
    },
  });
  revalidatePath("/admin/categories");
  revalidatePath("/");
  redirect("/admin/categories?toast=created");
}

export async function updateCategory(id: string, formData: FormData) {
  await prisma.projectCategory.update({
    where: { id },
    data: {
      name: String(formData.get("name")),
      order: Number(formData.get("order") || 0),
      active: formData.get("active") === "true",
    },
  });
  revalidatePath("/admin/categories");
  revalidatePath("/");
  redirect("/admin/categories?toast=updated");
}

export async function deleteCategory(id: string) {
  "use server";
  await prisma.projectCategory.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/");
}
