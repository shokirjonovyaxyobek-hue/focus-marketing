"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleCheckBig, LoaderCircle, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { createLead, type LeadFormState } from "@/lib/actions/lead";
import { Reveal } from "@/components/ui/Reveal";

const initialState: LeadFormState = { success: false };

function formatUzPhone(input: string) {
  const digits = input.replace(/\D/g, "").replace(/^998/, "");
  const d = digits.slice(0, 9);

  let out = "+998";

  if (d.length > 0) out += " " + d.slice(0, 2);
  if (d.length > 2) out += " " + d.slice(2, 5);
  if (d.length > 5) out += " " + d.slice(5, 7);
  if (d.length > 7) out += " " + d.slice(7, 9);

  return out;
}

export function Contact({
  title,
  text,
  phone: contactPhone,
  instagram,
}: {
  title: string;
  text: string | null;
  phone: string | null;
  instagram: string | null;
}) {
  const [state, formAction, pending] = useActionState(
    createLead,
    initialState
  );

  const [phone, setPhone] = useState("+998 ");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setPhone("+998 ");
    }
  }, [state.success]);

  return (
    <section id="contact" className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal direction="left">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            {title}
          </h2>

          {text && (
            <p className="mt-5 text-foreground/60 leading-relaxed max-w-md">
              {text}
            </p>
          )}

          {(contactPhone || instagram) && (
            <div className="mt-8 space-y-3">
              {contactPhone && (
                <a
                  href={`tel:${contactPhone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 group w-fit"
                >
                  <span className="w-11 h-11 rounded-full bg-focus-red/8 text-focus-red flex items-center justify-center shrink-0 group-hover:bg-focus-red group-hover:text-white transition-colors">
                    <Phone size={18} />
                  </span>

                  <span className="text-[15px] font-semibold text-foreground group-hover:text-focus-red transition-colors">
                    {contactPhone}
                  </span>
                </a>
              )}

              {instagram && (
                <a
                  href={
                    instagram.startsWith("http")
                      ? instagram
                      : `https://instagram.com/${instagram.replace("@", "")}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group w-fit"
                >
                  <span className="w-11 h-11 rounded-full bg-focus-red/8 text-focus-red flex items-center justify-center shrink-0 group-hover:bg-focus-red group-hover:text-white transition-colors">
                    <InstagramIcon size={18} />
                  </span>

                  <span className="text-[15px] font-semibold text-foreground group-hover:text-focus-red transition-colors">
                    {instagram.startsWith("http")
                      ? instagram.replace(
                          /^https?:\/\/(www\.)?instagram\.com\//,
                          "@"
                        )
                      : instagram}
                  </span>
                </a>
              )}
            </div>
          )}
        </Reveal>

        <Reveal direction="right">
          <div className="relative bg-white rounded-3xl border border-border-gray p-7 lg:p-8">
            <AnimatePresence mode="wait">
              {state.success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                      delay: 0.1,
                    }}
                    className="w-14 h-14 rounded-full bg-focus-red/10 text-focus-red flex items-center justify-center"
                  >
                    <CircleCheckBig size={28} />
                  </motion.div>

                  <h3 className="mt-4 font-bold text-lg text-foreground">
                    Rahmat!
                  </h3>

                  <p className="mt-1.5 text-sm text-foreground/55">
                    Murojaatingiz qabul qilindi. Tez orada siz bilan
                    bog&apos;lanamiz.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  action={formAction}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                      Ismingiz
                    </label>

                    <input
                      name="name"
                      required
                      minLength={2}
                      placeholder="Ismingizni kiriting"
                      className="w-full rounded-xl border border-border-gray px-4 py-3 text-sm outline-none focus:border-focus-red focus:ring-2 focus:ring-focus-red/10 transition-colors"
                    />

                    {state.fieldErrors?.name && (
                      <p className="text-xs text-focus-red mt-1">
                        {state.fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                      Telefon raqamingiz
                    </label>

                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30"
                      />

                      <input
                        name="phone"
                        required
                        value={phone}
                        onChange={(e) =>
                          setPhone(formatUzPhone(e.target.value))
                        }
                        placeholder="+998 XX XXX XX XX"
                        className="w-full rounded-xl border border-border-gray pl-11 pr-4 py-3 text-sm outline-none focus:border-focus-red focus:ring-2 focus:ring-focus-red/10 transition-colors"
                      />
                    </div>

                    {state.fieldErrors?.phone && (
                      <p className="text-xs text-focus-red mt-1">
                        {state.fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                      Loyihangiz Instagram useri
                    </label>

                    <div className="relative">
                      <InstagramIcon
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30"
                      />

                      <input
                        name="instagram"
                        placeholder="@brendingiz"
                        className="w-full rounded-xl border border-border-gray pl-11 pr-4 py-3 text-sm outline-none focus:border-focus-red focus:ring-2 focus:ring-focus-red/10 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                      Loyihangiz haqida qisqacha
                    </label>

                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Bizga loyihangiz haqida yozing..."
                      className="w-full rounded-xl border border-border-gray px-4 py-3 text-sm outline-none focus:border-focus-red focus:ring-2 focus:ring-focus-red/10 transition-colors resize-none"
                    />
                  </div>

                  {state.error && (
                    <p className="text-sm text-focus-red bg-focus-red/5 border border-focus-red/20 rounded-lg px-3 py-2">
                      {state.error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full inline-flex items-center justify-center gap-2 bg-focus-red hover:bg-focus-red-dark disabled:opacity-60 text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-colors"
                  >
                    {pending ? (
                      <>
                        <LoaderCircle size={16} className="animate-spin" />
                        Yuborilmoqda...
                      </>
                    ) : (
                      <>Yuborish →</>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
