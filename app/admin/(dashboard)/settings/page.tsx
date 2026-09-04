import { Suspense } from "react";
import { getSiteSettings } from "@/lib/settings";
import { Field, TextInput, SubmitButton } from "@/components/admin/FormFields";
import { Toast } from "@/components/admin/Toast";
import { updateSiteSettings } from "./actions";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSiteSettings();
  const updateWithId = updateSiteSettings.bind(null, settings.id);

  return (
    <div className="max-w-lg space-y-6">
      <Suspense>
        <Toast />
      </Suspense>

      <div>
        <h1 className="text-2xl font-bold text-foreground">Sozlamalar</h1>
        <p className="text-sm text-foreground/50 mt-1">Bog&apos;lanish ma&apos;lumotlari va ijtimoiy tarmoqlar</p>
      </div>

      <form action={updateWithId} className="bg-white rounded-2xl border border-border-gray p-6 space-y-5">
        <Field label="Telefon raqami">
          <TextInput name="phone" defaultValue={settings.phone ?? ""} placeholder="+998 XX XXX XX XX" />
        </Field>
        <Field label="Email">
          <TextInput name="email" type="email" defaultValue={settings.email ?? ""} placeholder="info@focusmarketing.uz" />
        </Field>
        <Field label="Instagram">
          <TextInput name="instagram" defaultValue={settings.instagram ?? ""} placeholder="@focusmarketing.uz" />
        </Field>
        <Field label="Telegram">
          <TextInput name="telegram" defaultValue={settings.telegram ?? ""} placeholder="@focusmarketing" />
        </Field>
        <Field label="Manzil">
          <TextInput name="address" defaultValue={settings.address ?? ""} placeholder="Toshkent shahri, ..." />
        </Field>
        <Field label="Ish vaqti">
          <TextInput name="workingHours" defaultValue={settings.workingHours ?? ""} placeholder="Dush-Juma, 09:00 - 18:00" />
        </Field>
        <Field label="Footer matni">
          <TextInput name="footerText" defaultValue={settings.footerText ?? ""} placeholder="© 2026 Focus Marketing. Barcha huquqlar himoyalangan." />
        </Field>
        <SubmitButton>Saqlash</SubmitButton>
      </form>
    </div>
  );
}
