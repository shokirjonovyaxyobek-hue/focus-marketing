import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";

export function Footer({
  footerText,
  instagram,
  telegram,
}: {
  footerText: string | null;
  instagram: string | null;
  telegram: string | null;
}) {
  return (
    <footer className="border-t border-border-gray py-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/focus-logo.png" alt="FOCUS Marketing" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="text-xs font-semibold text-foreground/50">Focus Marketing</span>
        </Link>

        <div className="flex items-center gap-3">
          {instagram && (
            <a
              href={instagram.startsWith("http") ? instagram : `https://instagram.com/${instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-surface-gray flex items-center justify-center text-foreground/50 hover:text-focus-red transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
          )}
          {telegram && (
            <a
              href={telegram.startsWith("http") ? telegram : `https://t.me/${telegram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-surface-gray flex items-center justify-center text-foreground/50 hover:text-focus-red transition-colors"
              aria-label="Telegram"
            >
              <Send size={15} />
            </a>
          )}
        </div>

        <p className="text-xs text-foreground/40 order-3 sm:order-none">
          {footerText ?? "© 2026 Focus Marketing. Barcha huquqlar himoyalangan."}
        </p>
      </div>
    </footer>
  );
}
