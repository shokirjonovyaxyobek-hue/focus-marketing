import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Field, TextInput, ToggleField, SubmitButton } from "@/components/admin/FormFields";
import { updateStatistic } from "../../actions";

export default async function EditStatisticPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const stat = await prisma.statistic.findUnique({ where: { id } });
  if (!stat) notFound();

  const updateWithId = updateStatistic.bind(null, id);

  return (
    <div className="max-w-lg space-y-6">
      <Link href="/admin/statistics" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-focus-red">
        <ArrowLeft size={16} /> Statistikalar
      </Link>
      <h1 className="text-2xl font-bold text-foreground">Statistikani tahrirlash</h1>

      <form action={updateWithId} className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
        <Field label="Nomi">
          <TextInput name="label" required defaultValue={stat.label} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Qiymat">
            <TextInput name="value" type="number" required defaultValue={stat.value} />
          </Field>
          <Field label="Belgi">
            <TextInput name="suffix" defaultValue={stat.suffix ?? ""} />
          </Field>
        </div>
        <Field label="Tartib raqami">
          <TextInput name="order" type="number" defaultValue={stat.order} />
        </Field>
        <ToggleField name="active" label="Faol" defaultChecked={stat.active} />
        <SubmitButton>Saqlash</SubmitButton>
      </form>
    </div>
  );
}
