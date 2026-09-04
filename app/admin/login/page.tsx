"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email yoki parol noto'g'ri.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-gray px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-border-gray shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="text-2xl font-extrabold tracking-tight text-foreground">
            FOCUS<span className="text-focus-red">.</span>
          </div>
          <p className="text-sm text-foreground/50 mt-1">Admin panelga kirish</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border-gray px-4 py-2.5 text-sm outline-none focus:border-focus-red focus:ring-2 focus:ring-focus-red/10 transition-colors"
              placeholder="Loginni kiriting"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1.5">
              Parol
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border-gray px-4 py-2.5 text-sm outline-none focus:border-focus-red focus:ring-2 focus:ring-focus-red/10 transition-colors"
              placeholder="Parolni kiriting"
            />
          </div>

          {error && (
            <p className="text-sm text-focus-red bg-focus-red/5 border border-focus-red/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-focus-red hover:bg-focus-red-dark disabled:opacity-60 text-white font-medium rounded-xl py-2.5 text-sm transition-colors"
          >
            {loading ? "Kirilmoqda..." : "Kirish"}
          </button>
        </form>
      </div>
    </div>
  );
}
