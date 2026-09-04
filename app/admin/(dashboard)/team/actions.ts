"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTeamMember(formData: FormData) {
  await prisma.teamMember.create({
    data: {
      fullName: String(formData.get("fullName")),
      position: String(formData.get("position")),
      experience: String(formData.get("experience") || "") || null,
      photo: String(formData.get("photo") || "") || null,
      instagram: String(formData.get("instagram") || "") || null,
      linkedin: String(formData.get("linkedin") || "") || null,
      order: Number(formData.get("order") || 0),
      active: formData.get("active") === "true",
    },
  });
  revalidatePath("/admin/team");
  revalidatePath("/");
  redirect("/admin/team?toast=created");
}

export async function updateTeamMember(id: string, formData: FormData) {
  await prisma.teamMember.update({
    where: { id },
    data: {
      fullName: String(formData.get("fullName")),
      position: String(formData.get("position")),
      experience: String(formData.get("experience") || "") || null,
      photo: String(formData.get("photo") || "") || null,
      instagram: String(formData.get("instagram") || "") || null,
      linkedin: String(formData.get("linkedin") || "") || null,
      order: Number(formData.get("order") || 0),
      active: formData.get("active") === "true",
    },
  });
  revalidatePath("/admin/team");
  revalidatePath("/");
  redirect("/admin/team?toast=updated");
}

export async function deleteTeamMember(id: string) {
  "use server";
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/admin/team");
  revalidatePath("/");
}
