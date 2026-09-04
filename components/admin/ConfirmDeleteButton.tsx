"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, LoaderCircle } from "lucide-react";

export function ConfirmDeleteButton({
  action,
  itemLabel,
}: {
  action: () => Promise<void>;
  itemLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/40 hover:bg-focus-red/8 hover:text-focus-red transition-colors"
        aria-label="O'chirish"
      >
        <Trash2 size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/40 flex items-center justify-center px-4"
            onClick={() => !pending && setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
            >
              <h3 className="font-bold text-foreground">O&apos;chirishni tasdiqlang</h3>
              <p className="mt-1.5 text-sm text-foreground/55">
                <strong>{itemLabel}</strong>ni o&apos;chirmoqchimisiz? Bu amalni ortga qaytarib bo&apos;lmaydi.
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setOpen(false)}
                  disabled={pending}
                  className="flex-1 text-sm font-medium border border-border-gray rounded-xl py-2.5 hover:bg-surface-gray transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() =>
                    startTransition(async () => {
                      await action();
                      setOpen(false);
                    })
                  }
                  disabled={pending}
                  className="flex-1 text-sm font-medium bg-focus-red hover:bg-focus-red-dark text-white rounded-xl py-2.5 transition-colors flex items-center justify-center gap-2"
                >
                  {pending ? <LoaderCircle size={15} className="animate-spin" /> : null}
                  O&apos;chirish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
