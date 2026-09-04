import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Field, TextInput, ToggleField, SubmitButton } from "@/components/admin/FormFields";
import { createStatistic } from "../actions";

export default function NewStatisticPage() {
  return (
    <div className="max-w-lg space-y-6">
      <Link href="/admin/statistics" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-focus-red">
        <ArrowLeft size={16} /> Statistikalar
      </Link>
      <h1 className="text-2xl font-bold text-foreground">Yangi statistika</h1>

      <form action={createStatistic} className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
        <Field label="Nomi (masalan: Yillik tajriba)">
          <TextInput name="label" required placeholder="Yillik tajriba" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Qiymat">
            <TextInput name="value" type="number" required placeholder="120" />
          </Field>
          <Field label="Belgi (+, %, bo'sh)">
            <TextInput name="suffix" placeholder="+" />
          </Field>
        </div>
        <Field label="Tartib raqami">
          <TextInput name="order" type="number" defaultValue={0} />
        </Field>
        <ToggleField name="active" label="Faol" defaultChecked />
        <SubmitButton>Qo&apos;shish</SubmitButton>
      </form>
    </div>
  );
}
