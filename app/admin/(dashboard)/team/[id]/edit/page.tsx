import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Field, TextInput, ToggleField, SubmitButton } from "@/components/admin/FormFields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { updateTeamMember } from "../../actions";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();

  const updateWithId = updateTeamMember.bind(null, id);

  return (
    <div className="max-w-lg space-y-6">
      <Link href="/admin/team" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-focus-red">
        <ArrowLeft size={16} /> Jamoa
      </Link>
      <h1 className="text-2xl font-bold text-foreground">A&apos;zoni tahrirlash</h1>

      <form action={updateWithId} className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
        <ImageUploader name="photo" label="Foto" defaultValue={member.photo} />
        <Field label="Ism familiya">
          <TextInput name="fullName" required defaultValue={member.fullName} />
        </Field>
        <Field label="Lavozim">
          <TextInput name="position" required defaultValue={member.position} />
        </Field>
        <Field label="Tajriba">
          <TextInput name="experience" defaultValue={member.experience ?? ""} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Instagram">
            <TextInput name="instagram" defaultValue={member.instagram ?? ""} />
          </Field>
          <Field label="LinkedIn">
            <TextInput name="linkedin" defaultValue={member.linkedin ?? ""} />
          </Field>
        </div>
        <Field label="Tartib raqami">
          <TextInput name="order" type="number" defaultValue={member.order} />
        </Field>
        <ToggleField name="active" label="Faol" defaultChecked={member.active} />
        <SubmitButton>Saqlash</SubmitButton>
      </form>
    </div>
  );
}
