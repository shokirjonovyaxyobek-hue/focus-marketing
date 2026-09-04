import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Field, TextInput, TextArea, Select, ToggleField, SubmitButton } from "@/components/admin/FormFields";
import { createService } from "../actions";

const ICONS = [
  "Target", "Megaphone", "TrendingUp", "Palette", "PenTool", "ChartColumn",
  "Users", "Camera", "Video", "Layers", "Sparkles", "Search", "Globe", "Zap",
];

export default function NewServicePage() {
  return (
    <div className="max-w-lg space-y-6">
      <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-focus-red">
        <ArrowLeft size={16} /> Xizmatlar
      </Link>
      <h1 className="text-2xl font-bold text-foreground">Yangi xizmat</h1>

      <form action={createService} className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Raqami">
            <TextInput name="number" type="number" required placeholder="1" />
          </Field>
          <Field label="Ikonka">
            <Select name="icon" defaultValue="Target">
              {ICONS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Sarlavha">
          <TextInput name="title" required placeholder="Strategiya" />
        </Field>
        <Field label="Tavsif">
          <TextArea name="description" required rows={3} placeholder="Xizmat haqida qisqacha..." />
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
