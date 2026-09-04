import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Field, TextInput, ToggleField, SubmitButton } from "@/components/admin/FormFields";
import { updateCategory } from "../../actions";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await prisma.projectCategory.findUnique({ where: { id } });
  if (!category) notFound();

  const updateWithId = updateCategory.bind(null, id);

  return (
    <div className="max-w-lg space-y-6">
      <Link href="/admin/categories" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-focus-red">
        <ArrowLeft size={16} /> Kategoriyalar
      </Link>
      <h1 className="text-2xl font-bold text-foreground">Kategoriyani tahrirlash</h1>

      <form action={updateWithId} className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
        <Field label="Nomi">
          <TextInput name="name" required defaultValue={category.name} />
        </Field>
        <Field label="Tartib raqami">
          <TextInput name="order" type="number" defaultValue={category.order} />
        </Field>
        <ToggleField name="active" label="Faol" defaultChecked={category.active} />
        <SubmitButton>Saqlash</SubmitButton>
      </form>
    </div>
  );
}
