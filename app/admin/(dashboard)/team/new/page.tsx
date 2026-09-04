import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Field, TextInput, ToggleField, SubmitButton } from "@/components/admin/FormFields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createTeamMember } from "../actions";

export default function NewTeamMemberPage() {
  return (
    <div className="max-w-lg space-y-6">
      <Link href="/admin/team" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-focus-red">
        <ArrowLeft size={16} /> Jamoa
      </Link>
      <h1 className="text-2xl font-bold text-foreground">Yangi jamoa a&apos;zosi</h1>

      <form action={createTeamMember} className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
        <ImageUploader name="photo" label="Foto" />
        <Field label="Ism familiya">
          <TextInput name="fullName" required placeholder="Aziz Karimov" />
        </Field>
        <Field label="Lavozim">
          <TextInput name="position" required placeholder="Marketing direktori" />
        </Field>
        <Field label="Tajriba">
          <TextInput name="experience" placeholder="5 yillik tajriba" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Instagram">
            <TextInput name="instagram" placeholder="https://instagram.com/..." />
          </Field>
          <Field label="LinkedIn">
            <TextInput name="linkedin" placeholder="https://linkedin.com/in/..." />
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
