"use client";

import { ReactNode, useState } from "react";

export function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/70 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-focus-red mt-1.5">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-border-gray px-4 py-2.5 text-sm outline-none focus:border-focus-red focus:ring-2 focus:ring-focus-red/10 transition-colors";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} resize-none ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} bg-white ${props.className ?? ""}`} />;
}

export function ToggleField({
  name,
  label,
  defaultChecked = true,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input type="hidden" name={name} value={checked ? "true" : "false"} />
      <button
        type="button"
        onClick={() => setChecked((c) => !c)}
        className={`w-10 h-6 rounded-full transition-colors relative shrink-0 ${
          checked ? "bg-focus-red" : "bg-border-gray"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </button>
      <span className="text-sm font-medium text-foreground/70">{label}</span>
    </label>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="bg-focus-red hover:bg-focus-red-dark text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
    >
      {children}
    </button>
  );
}
