import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Field, TextInput, ToggleField, SubmitButton } from "@/components/admin/FormFields";
import { createCategory } from "../actions";

export default function NewCategoryPage() {
  return (
    <div className="max-w-lg space-y-6">
      <Link href="/admin/categories" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-focus-red">
        <ArrowLeft size={16} /> Kategoriyalar
      </Link>
      <h1 className="text-2xl font-bold text-foreground">Yangi kategoriya</h1>

      <form action={createCategory} className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
        <Field label="Nomi">
          <TextInput name="name" required placeholder="Shaxsiy brand" />
        </Field>
        <Field label="Tartib raqami">
          <TextInput name="order" type="number" defaultValue={0} />
        </Field>
        <ToggleField name="active" label="Faol" defaultChecked />
        <SubmitButton>Qo&apos;shish</SubmitButton>
      </form>
    </div>
  );
}
