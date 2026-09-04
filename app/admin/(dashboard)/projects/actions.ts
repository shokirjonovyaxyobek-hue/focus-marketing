"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/gi, "")
      .trim()
      .replace(/\s+/g, "-") +
    "-" +
    Math.random().toString(36).slice(2, 6)
  );
}

function parseImages(formData: FormData): string[] {
  try {
    const raw = String(formData.get("images") || "[]");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((u) => typeof u === "string") : [];
  } catch {
    return [];
  }
}

function baseData(formData: FormData) {
  return {
    name: String(formData.get("name")),
    categoryId: String(formData.get("categoryId")),
    mainImage: String(formData.get("mainImage") || ""),
    shortDescription: String(formData.get("shortDescription")),
    fullDescription: String(formData.get("fullDescription") || "") || null,
    result: String(formData.get("result") || "") || null,
    resultNumber: String(formData.get("resultNumber") || "") || null,
    duration: String(formData.get("duration") || "") || null,
    audience: String(formData.get("audience") || "") || null,
    instagramUrl: String(formData.get("instagramUrl") || "") || null,
    websiteUrl: String(formData.get("websiteUrl") || "") || null,
    order: Number(formData.get("order") || 0),
    featured: formData.get("featured") === "true",
    active: formData.get("active") === "true",
  };
}

export async function createProject(formData: FormData) {
  const name = String(formData.get("name"));
  const images = parseImages(formData);

  await prisma.project.create({
    data: {
      ...baseData(formData),
      slug: slugify(name),
      images: {
        create: images.map((url, i) => ({ url, order: i })),
      },
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects?toast=created");
}

export async function updateProject(id: string, formData: FormData) {
  const images = parseImages(formData);

  await prisma.$transaction([
    prisma.projectImage.deleteMany({ where: { projectId: id } }),
    prisma.project.update({
      where: { id },
      data: {
        ...baseData(formData),
        images: {
          create: images.map((url, i) => ({ url, order: i })),
        },
      },
    }),
  ]);

  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath(`/projects`);
  redirect("/admin/projects?toast=updated");
}

export async function deleteProject(id: string) {
  "use server";
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
