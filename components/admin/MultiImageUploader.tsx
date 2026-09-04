"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Plus, X, LoaderCircle } from "lucide-react";

export function MultiImageUploader({
  name,
  defaultValue = [],
  label = "Qo'shimcha rasmlar",
}: {
  name: string;
  defaultValue?: string[];
  label?: string;
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (res.ok) uploaded.push(data.url);
      }
      setUrls((prev) => [...prev, ...uploaded]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-foreground/70 mb-1.5">{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(urls)} />

      <div className="grid grid-cols-3 gap-3">
        {urls.map((url, i) => (
          <div key={url + i} className="relative aspect-square rounded-xl overflow-hidden border border-border-gray bg-surface-gray group">
            <Image src={url} alt="" fill className="object-contain p-1.5" />
            <button
              type="button"
              onClick={() => setUrls((prev) => prev.filter((_, idx) => idx !== i))}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-foreground/60 hover:text-focus-red opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={13} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="aspect-square rounded-xl border-2 border-dashed border-border-gray flex items-center justify-center text-foreground/40 hover:border-focus-red hover:text-focus-red transition-colors"
        >
          {uploading ? <LoaderCircle size={18} className="animate-spin" /> : <Plus size={18} />}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files);
        }}
      />
    </div>
  );
}
