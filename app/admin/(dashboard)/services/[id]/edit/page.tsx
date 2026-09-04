import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Field, TextInput, TextArea, Select, ToggleField, SubmitButton } from "@/components/admin/FormFields";
import { updateService } from "../../actions";

const ICONS = [
  "Target", "Megaphone", "TrendingUp", "Palette", "PenTool", "ChartColumn",
  "Users", "Camera", "Video", "Layers", "Sparkles", "Search", "Globe", "Zap",
];

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  const updateWithId = updateService.bind(null, id);

  return (
    <div className="max-w-lg space-y-6">
      <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-focus-red">
        <ArrowLeft size={16} /> Xizmatlar
      </Link>
      <h1 className="text-2xl font-bold text-foreground">Xizmatni tahrirlash</h1>

      <form action={updateWithId} className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Raqami">
            <TextInput name="number" type="number" required defaultValue={service.number} />
          </Field>
          <Field label="Ikonka">
            <Select name="icon" defaultValue={service.icon ?? "Target"}>
              {ICONS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Sarlavha">
          <TextInput name="title" required defaultValue={service.title} />
        </Field>
        <Field label="Tavsif">
          <TextArea name="description" required rows={3} defaultValue={service.description} />
        </Field>
        <Field label="Tartib raqami">
          <TextInput name="order" type="number" defaultValue={service.order} />
        </Field>
        <ToggleField name="active" label="Faol" defaultChecked={service.active} />
        <SubmitButton>Saqlash</SubmitButton>
      </form>
    </div>
  );
}
