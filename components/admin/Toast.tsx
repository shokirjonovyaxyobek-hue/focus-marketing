"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CircleCheckBig, CircleX } from "lucide-react";

const messages: Record<string, { text: string; type: "success" | "error" }> = {
  created: { text: "Muvaffaqiyatli qo'shildi", type: "success" },
  updated: { text: "Muvaffaqiyatli yangilandi", type: "success" },
  deleted: { text: "O'chirildi", type: "success" },
  error: { text: "Xatolik yuz berdi", type: "error" },
};

export function Toast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const toastKey = searchParams.get("toast");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toastKey) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      const params = new URLSearchParams(searchParams);
      params.delete("toast");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }, 2800);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastKey]);

  const toast = toastKey ? messages[toastKey] : null;
  if (!toast) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          className={`fixed top-5 right-5 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
            toast.type === "success"
              ? "bg-white border-green-200 text-green-700"
              : "bg-white border-focus-red/20 text-focus-red"
          }`}
        >
          {toast.type === "success" ? <CircleCheckBig size={18} /> : <CircleX size={18} />}
          {toast.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
