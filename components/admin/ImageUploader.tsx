"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { X, LoaderCircle, Image as ImageIcon } from "lucide-react";

export function ImageUploader({
  name,
  defaultValue,
  label = "Rasm",
}: {
  name: string;
  defaultValue?: string | null;
  label?: string;
}) {
  const [url, setUrl] = useState<string | null>(defaultValue ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yuklashda xatolik.");
      setUrl(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yuklashda xatolik.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-foreground/70 mb-1.5">{label}</label>
      <input type="hidden" name={name} value={url ?? ""} />

      {url ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border-gray bg-surface-gray group">
          <Image src={url} alt="" fill className="object-contain p-2" />
          <button
            type="button"
            onClick={() => setUrl(null)}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-foreground/60 hover:text-focus-red opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full aspect-video rounded-xl border-2 border-dashed border-border-gray flex flex-col items-center justify-center gap-2 text-foreground/40 hover:border-focus-red hover:text-focus-red transition-colors"
        >
          {uploading ? (
            <>
              <LoaderCircle size={22} className="animate-spin" />
              <span className="text-xs font-medium">Yuklanmoqda...</span>
            </>
          ) : (
            <>
              <ImageIcon size={22} />
              <span className="text-xs font-medium">Rasm yuklash uchun bosing</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {error && <p className="text-xs text-focus-red mt-1.5">{error}</p>}
    </div>
  );
}
