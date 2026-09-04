import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Field, TextInput, TextArea, Select, ToggleField, SubmitButton } from "@/components/admin/FormFields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { MultiImageUploader } from "@/components/admin/MultiImageUploader";
import { updateProject } from "../../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, categories] = await Promise.all([
    prisma.project.findUnique({ where: { id }, include: { images: { orderBy: { order: "asc" } } } }),
    prisma.projectCategory.findMany({ orderBy: { order: "asc" } }),
  ]);
  if (!project) notFound();

  const updateWithId = updateProject.bind(null, id);

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-focus-red">
        <ArrowLeft size={16} /> Loyihalar
      </Link>
      <h1 className="text-2xl font-bold text-foreground">Loyihani tahrirlash</h1>

      <form action={updateWithId} className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
        <ImageUploader name="mainImage" label="Asosiy rasm" defaultValue={project.mainImage} />

        <Field label="Loyiha nomi">
          <TextInput name="name" required defaultValue={project.name} />
        </Field>

        <Field label="Kategoriya">
          <Select name="categoryId" required defaultValue={project.categoryId}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Select>
        </Field>

        <Field label="Qisqacha tavsif">
          <TextArea name="shortDescription" required rows={2} defaultValue={project.shortDescription} />
        </Field>

        <Field label="To'liq tavsif">
          <TextArea name="fullDescription" rows={5} defaultValue={project.fullDescription ?? ""} />
        </Field>

        <Field label="Natija (matn)">
          <TextInput name="result" defaultValue={project.result ?? ""} />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Natija raqami">
            <TextInput name="resultNumber" defaultValue={project.resultNumber ?? ""} />
          </Field>
          <Field label="Muddat">
            <TextInput name="duration" defaultValue={project.duration ?? ""} />
          </Field>
          <Field label="Auditoriya">
            <TextInput name="audience" defaultValue={project.audience ?? ""} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Instagram URL">
            <TextInput name="instagramUrl" defaultValue={project.instagramUrl ?? ""} />
          </Field>
          <Field label="Veb-sayt URL">
            <TextInput name="websiteUrl" defaultValue={project.websiteUrl ?? ""} />
          </Field>
        </div>

        <MultiImageUploader name="images" label="Galereya rasmlari" defaultValue={project.images.map((i) => i.url)} />

        <Field label="Tartib raqami">
          <TextInput name="order" type="number" defaultValue={project.order} />
        </Field>

        <div className="flex items-center gap-8">
          <ToggleField name="featured" label="Tanlangan (featured)" defaultChecked={project.featured} />
          <ToggleField name="active" label="Faol" defaultChecked={project.active} />
        </div>

        <SubmitButton>Saqlash</SubmitButton>
      </form>
    </div>
  );
}
