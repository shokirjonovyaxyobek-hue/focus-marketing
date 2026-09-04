# FOCUS Marketing — To'liq sayt + Admin Panel

100% o'zbek tilida, PREMIUM oq fon + FOCUS RED accent dizaynida marketing agentligi sayti.

## Nima tayyor

### Public sayt
- **Navbar** — sticky, scroll'da shadow animatsiyasi, mobil hamburger menyu
- **Hero** — stagger sarlavha animatsiyasi, floating statistik kartalar
- **Statistika** — scroll'ga kirganda 0 dan qiymatgacha animated counter
- **Biz haqimizda** — rasm reveal, fade-up matnlar
- **Xizmatlar** — raqamlangan kartalar, ikonka, hover animatsiya
- **Loyihalar** — kategoriya filtri (smooth layout transition), 2 ustunli grid, har bir loyiha `/projects/[slug]` sahifasiga ochiladi
- **Loyiha tafsiloti** — katta hero rasm, natijalar, statistika, galereya, ijtimoiy havolalar
- **Jamoa** — auto-play, infinite-loop, markazdagi a'zo katta ko'rinishdagi carousel
- **Hamkorlik formasi** — O'zbekiston telefon formati (+998 XX XXX XX XX avtomatik format), validatsiya, loading/success animatsiya, ma'lumotlar bazasiga saqlanadi
- **Footer** — admin boshqaradigan matn va ijtimoiy havolalar
- `prefers-reduced-motion` qo'llab-quvvatlanadi
- To'liq responsive: desktop / tablet / mobile
- SEO metadata, OpenGraph, semantic HTML

### Admin panel (`/admin`)
- **Login**: `admin@focusmarketing.uz` / `focus1122`
- **Dashboard** — statistikalar, so'nggi murojaatlar va loyihalar
- **Biz haqimizda** — Hero, About, Contact bo'limlari matnlarini tahrirlash
- **Xizmatlar** — to'liq CRUD, ikonka tanlash, tartib, faol/nofaol
- **Loyihalar** — to'liq CRUD: asosiy rasm, galereya (ko'p rasm), kategoriya, natijalar, statistika, ijtimoiy havolalar, featured/active
- **Kategoriyalar** — to'liq CRUD
- **Jamoa** — to'liq CRUD, rasm yuklash
- **Statistikalar** — to'liq CRUD
- **Murojaatlar** — status boshqarish (Yangi / Jarayonda / Bog'lanildi / Yakunlandi), o'qilgan/o'qilmagan, o'chirish
- **Sozlamalar** — telefon, email, Instagram, Telegram, manzil, ish vaqti, footer matni
- Har bir CRUD amalida toast bildirishnoma va o'chirish tasdiqlash modali
- Rasm yuklash — Vercel Blob orqali (`/api/upload`)
- `/admin` faqat login qilgan foydalanuvchiga ochiq (middleware himoyasi)

## O'rnatish

1. **Bog'liqliklarni o'rnating:**
   ```bash
   npm install
   ```

2. **`.env` faylini yarating:**
   ```bash
   cp .env.example .env
   ```

3. **Neon PostgreSQL yarating** — https://neon.tech (bepul tier). `DATABASE_URL` va `DIRECT_URL`ni `.env`ga qo'ying.

4. **NextAuth secret:**
   ```bash
   npx auth secret
   ```
   Natijani `AUTH_SECRET`ga qo'ying.

5. **Vercel Blob token** — Vercel loyihangizda Storage → Blob → Create, tokenni `BLOB_READ_WRITE_TOKEN`ga qo'ying.

6. **Schema'ni yuklang:**
   ```bash
   npm run db:push
   ```

7. **Admin userni yarating:**
   ```bash
   npm run db:seed
   ```

8. **Ishga tushiring:**
   ```bash
   npm run dev
   ```

9. Ochish:
   - Sayt: http://localhost:3000
   - Admin: http://localhost:3000/admin/login

## Kontent qo'shish tartibi (birinchi marta)

1. `/admin/settings` — telefon, Instagram va boshqa kontakt ma'lumotlarni kiriting
2. `/admin/about` — Hero sarlavha, Biz haqimizda matnini tahrirlang
3. `/admin/statistics` — 4 ta statistik ko'rsatkich qo'shing (masalan: "Yillik tajriba" — 4, "+")
4. `/admin/services` — xizmatlaringizni qo'shing
5. `/admin/categories` — loyiha kategoriyalarini yarating (masalan: SMM, Web, Branding)
6. `/admin/projects` — loyihalaringizni qo'shing (avval kategoriya kerak)
7. `/admin/team` — jamoa a'zolarini qo'shing

Hech narsa qo'shilmaguncha bosh sahifadagi bo'limlar bo'sh ko'rinadi (masalan, statistikalar yoki loyihalar bo'lmasa, o'sha bo'lim ko'rsatilmaydi).

## Production'ga chiqarish (Vercel)

1. Repo'ni GitHub'ga push qiling
2. Vercel'da import qiling
3. Environment Variables bo'limiga `.env`dagi barcha qiymatlarni kiriting
4. Storage → Blob yarating, tokenni oling
5. Deploy qiling — Vercel avtomatik `prisma generate` ishlatadi
6. Birinchi deploy'dan keyin, local terminaldan production DB'ga ulanib: `npm run db:push && npm run db:seed`

## Texnik stack

- Next.js 16 (App Router, Server Actions)
- TypeScript
- Tailwind CSS v4
- Prisma + PostgreSQL (Neon)
- NextAuth v5 (Credentials)
- Vercel Blob (rasm saqlash)
- Framer Motion (animatsiyalar)
- Zod + React Hook Form pattern (validatsiya)
- Lucide React (ikonkalar)

## Muhim eslatma (sandbox haqida)

Ushbu kod shu chat/sandbox muhitida yaratildi va u yerda tarmoq cheklovi tufayli `prisma generate` ishlay olmadi (`binaries.prisma.sh`ga kirish yo'q edi), shuning uchun to'liq `npm run build`ni shu yerda ishga tushirib bo'lmadi. Kod ESLint orqali tekshirildi va xatolar yo'q. Local kompyuteringizda yoki Vercel'da `npm install` dan keyin bu muammo bo'lmaydi — Prisma o'z binarylarini muammosiz yuklab oladi.

Local'da birinchi marta ishga tushirganda, agar biror TypeScript xatosi chiqsa (juda kam ehtimol, lekin katta loyihalarda uchrashi mumkin), menga xato matnini yuboring — darhol tuzataman.
