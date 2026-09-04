import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@focusmarketing.uz";
  const password = "focus1122";
  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { password: hashed },
    create: {
      email,
      password: hashed,
      name: "Admin",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      phone: "+998 XX XXX XX XX",
      instagram: "@focusmarketing.uz",
      telegram: "",
      email: "info@focusmarketing.uz",
      address: "",
      workingHours: "Dush-Juma, 09:00 - 18:00",
      footerText: "© 2026 Focus Marketing. Barcha huquqlar himoyalangan.",
      heroTitle: "Biznesingizni keyingi bosqichga olib chiqamiz",
      heroSubtitle:
        "Strategiya, kreativ va natijaga yo'naltirilgan marketing yechimlari bilan brendingizni kuchaytiramiz.",
      heroCtaText: "Xizmatlarimiz bilan tanishing",
      heroCtaSecond: "Biz haqimizda",
      aboutTitle: "Biz haqimizda",
      aboutSubtitle: "Natijaga yo'naltirilgan marketing agentligi",
      aboutText:
        "FOCUS Marketing — brendlarni raqamli dunyoda kuchaytiruvchi marketing agentligi. Strategiya, ijodiy yechimlar va performance marketing orqali mijozlarimizga real natijalar taqdim etamiz.",
      contactTitle: "Hamkorlik uchun",
      contactText: "Biz bilan hamkorlik qilishni istaysizmi? Loyihangizni birga rivojlantiraylik!",
    },
  });

  console.log("Seed muvaffaqiyatli yakunlandi.");
  console.log(`Admin login: ${email}`);
  console.log(`Admin parol: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
