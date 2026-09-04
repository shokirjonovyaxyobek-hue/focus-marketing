import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Field, TextInput, TextArea, Select, ToggleField, SubmitButton } from "@/components/admin/FormFields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { MultiImageUploader } from "@/components/admin/MultiImageUploader";
import { createProject } from "../actions";

export default async function NewProjectPage() {
  const categories = await prisma.projectCategory.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-focus-red">
        <ArrowLeft size={16} /> Loyihalar
      </Link>
      <h1 className="text-2xl font-bold text-foreground">Yangi loyiha</h1>

      {categories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border-gray p-6 text-sm text-foreground/60">
          Avval kamida bitta kategoriya yarating.{" "}
          <Link href="/admin/categories/new" className="text-focus-red font-semibold hover:underline">
            Kategoriya qo&apos;shish →
          </Link>
        </div>
      ) : (
        <form action={createProject} className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
          <ImageUploader name="mainImage" label="Asosiy rasm" />

          <Field label="Loyiha nomi">
            <TextInput name="name" required placeholder="Oxford School" />
          </Field>

          <Field label="Kategoriya">
            <Select name="categoryId" required defaultValue="">
              <option value="" disabled>Tanlang</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Select>
          </Field>

          <Field label="Qisqacha tavsif">
            <TextArea name="shortDescription" required rows={2} placeholder="Ta'lim markazi uchun target reklama va sotuv tizimi." />
          </Field>

          <Field label="To'liq tavsif">
            <TextArea name="fullDescription" rows={5} placeholder="Vazifa, bajarilgan ishlar, natijalar..." />
          </Field>

          <Field label="Natija (matn)">
            <TextInput name="result" placeholder="2 oyda 2x sotuv o'sishi" />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Natija raqami">
              <TextInput name="resultNumber" placeholder="2 mlrd" />
            </Field>
            <Field label="Muddat">
              <TextInput name="duration" placeholder="6 oy" />
            </Field>
            <Field label="Auditoriya">
              <TextInput name="audience" placeholder="1000+ o'quvchi" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Instagram URL">
              <TextInput name="instagramUrl" placeholder="https://instagram.com/..." />
            </Field>
            <Field label="Veb-sayt URL">
              <TextInput name="websiteUrl" placeholder="https://..." />
            </Field>
          </div>

          <MultiImageUploader name="images" label="Galereya rasmlari" />

          <Field label="Tartib raqami">
            <TextInput name="order" type="number" defaultValue={0} />
          </Field>

          <div className="flex items-center gap-8">
            <ToggleField name="featured" label="Tanlangan (featured)" defaultChecked={false} />
            <ToggleField name="active" label="Faol" defaultChecked />
          </div>

          <SubmitButton>Qo&apos;shish</SubmitButton>
        </form>
      )}
    </div>
  );
}
