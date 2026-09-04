import { Suspense } from "react";
import { getSiteSettings } from "@/lib/settings";
import { Field, TextInput, TextArea, SubmitButton } from "@/components/admin/FormFields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Toast } from "@/components/admin/Toast";
import { updateAboutContent } from "./actions";

export const dynamic = "force-dynamic";

export default async function AboutContentPage() {
  const settings = await getSiteSettings();
  const updateWithId = updateAboutContent.bind(null, settings.id);

  return (
    <div className="max-w-2xl space-y-6">
      <Suspense>
        <Toast />
      </Suspense>

      <div>
        <h1 className="text-2xl font-bold text-foreground">Biz haqimizda</h1>
        <p className="text-sm text-foreground/50 mt-1">Bosh sahifadagi Hero, Biz haqimizda va Hamkorlik matnlari</p>
      </div>

      <form action={updateWithId} className="space-y-6">
        <div className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
          <h2 className="font-bold text-foreground">Hero bo&apos;limi</h2>
          <Field label="Sarlavha (title)">
            <TextArea name="heroTitle" rows={2} defaultValue={settings.heroTitle ?? ""} />
          </Field>
          <Field label="Sarlavha ostidagi matn (subtitle)">
            <TextArea name="heroSubtitle" rows={2} defaultValue={settings.heroSubtitle ?? ""} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Asosiy tugma matni">
              <TextInput name="heroCtaText" defaultValue={settings.heroCtaText ?? ""} />
            </Field>
            <Field label="Ikkinchi tugma matni">
              <TextInput name="heroCtaSecond" defaultValue={settings.heroCtaSecond ?? ""} />
            </Field>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
          <h2 className="font-bold text-foreground">Biz haqimizda bo&apos;limi</h2>
          <ImageUploader name="aboutImage" label="Rasm" defaultValue={settings.aboutImage} />
          <Field label="Ustki yorliq (subtitle)">
            <TextInput name="aboutSubtitle" defaultValue={settings.aboutSubtitle ?? ""} placeholder="Natijaga yo'naltirilgan marketing agentligi" />
          </Field>
          <Field label="Sarlavha">
            <TextInput name="aboutTitle" defaultValue={settings.aboutTitle ?? ""} />
          </Field>
          <Field label="Tavsif">
            <TextArea name="aboutText" rows={5} defaultValue={settings.aboutText ?? ""} />
          </Field>
        </div>

        <div className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
          <h2 className="font-bold text-foreground">Hamkorlik uchun bo&apos;limi</h2>
          <Field label="Sarlavha">
            <TextInput name="contactTitle" defaultValue={settings.contactTitle ?? ""} />
          </Field>
          <Field label="Matn">
            <TextArea name="contactText" rows={3} defaultValue={settings.contactText ?? ""} />
          </Field>
        </div>

        <SubmitButton>Saqlash</SubmitButton>
      </form>
    </div>
  );
}
