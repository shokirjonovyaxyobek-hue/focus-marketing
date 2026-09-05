-- ============================================================
-- FOCUS MARKETING — DATA-PRESERVING SCHEMA PREPARATION
-- STEP 1
--
-- MUHIM:
-- - DROP TABLE yo'q
-- - TRUNCATE yo'q
-- - DELETE yo'q
-- - Mavjud ma'lumotlar saqlanadi
-- - Transaction ichida ishlaydi
-- ============================================================

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- 1. ProjectCategory
-- ============================================================

CREATE TABLE IF NOT EXISTS "ProjectCategory" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "order" INTEGER NOT NULL DEFAULT 0,
  "active" BOOLEAN NOT NULL DEFAULT true
);

-- Eski Project.category dan kategoriyalar yaratish
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'Project'
      AND column_name = 'category'
  ) THEN

    INSERT INTO "ProjectCategory" ("name", "slug")
    SELECT DISTINCT
      trim("category"),
      lower(
        regexp_replace(
          regexp_replace(
            trim("category"),
            '[^a-zA-Z0-9\s-]',
            '',
            'g'
          ),
          '\s+',
          '-',
          'g'
        )
      )
    FROM "Project"
    WHERE "category" IS NOT NULL
      AND trim("category") <> ''
    ON CONFLICT ("slug") DO NOTHING;

  END IF;
END $$;

-- Umumiy kategoriya
INSERT INTO "ProjectCategory" ("name", "slug")
VALUES ('Umumiy', 'umumiy')
ON CONFLICT ("slug") DO NOTHING;


-- ============================================================
-- 2. Project — yangi ustunlar
-- ============================================================

ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "name" TEXT;

ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "mainImage" TEXT;

ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "categoryId" TEXT;

ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "fullDescription" TEXT;

ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "result" TEXT;

ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "resultNumber" TEXT;

ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "duration" TEXT;

ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "audience" TEXT;

ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "instagramUrl" TEXT;

ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "websiteUrl" TEXT;

ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "featured" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "active" BOOLEAN NOT NULL DEFAULT true;


-- Eski ma'lumotlarni yangi fieldlarga ko'chirish

DO $$
BEGIN

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Project'
      AND column_name = 'title'
  ) THEN
    UPDATE "Project"
    SET "name" = "title"
    WHERE "name" IS NULL
      AND "title" IS NOT NULL;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Project'
      AND column_name = 'coverImage'
  ) THEN
    UPDATE "Project"
    SET "mainImage" = "coverImage"
    WHERE "mainImage" IS NULL
      AND "coverImage" IS NOT NULL;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Project'
      AND column_name = 'description'
  ) THEN
    UPDATE "Project"
    SET "fullDescription" = "description"
    WHERE "fullDescription" IS NULL
      AND "description" IS NOT NULL;
  END IF;

END $$;


-- Bo'sh qiymatlar uchun xavfsiz fallback
UPDATE "Project"
SET "name" = 'Nomsiz loyiha'
WHERE "name" IS NULL
   OR trim("name") = '';

UPDATE "Project"
SET "mainImage" = ''
WHERE "mainImage" IS NULL;


-- Project -> ProjectCategory bog'lash

DO $$
BEGIN

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Project'
      AND column_name = 'category'
  ) THEN

    UPDATE "Project" p
    SET "categoryId" = pc."id"
    FROM "ProjectCategory" pc
    WHERE p."categoryId" IS NULL
      AND trim(p."category") = pc."name";

  END IF;

END $$;


-- Qolganlarini Umumiy kategoriyaga bog'lash
UPDATE "Project"
SET "categoryId" = (
  SELECT "id"
  FROM "ProjectCategory"
  WHERE "slug" = 'umumiy'
)
WHERE "categoryId" IS NULL;


-- NOT NULL qilish
ALTER TABLE "Project"
ALTER COLUMN "name" SET NOT NULL;

ALTER TABLE "Project"
ALTER COLUMN "mainImage" SET NOT NULL;

ALTER TABLE "Project"
ALTER COLUMN "categoryId" SET NOT NULL;


-- Foreign key mavjud bo'lmasa yaratish
DO $$
BEGIN

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'Project_categoryId_fkey'
  ) THEN

    ALTER TABLE "Project"
    ADD CONSTRAINT "Project_categoryId_fkey"
    FOREIGN KEY ("categoryId")
    REFERENCES "ProjectCategory"("id")
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

  END IF;

END $$;


-- ============================================================
-- 3. Service
-- ============================================================

ALTER TABLE "Service"
ADD COLUMN IF NOT EXISTS "number" INTEGER;

ALTER TABLE "Service"
ADD COLUMN IF NOT EXISTS "active" BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE "Service"
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3);


WITH numbered AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (
      ORDER BY "order" ASC, "createdAt" ASC
    ) AS rn
  FROM "Service"
)
UPDATE "Service" s
SET "number" = n.rn
FROM numbered n
WHERE s."id" = n."id"
  AND s."number" IS NULL;


UPDATE "Service"
SET "updatedAt" = COALESCE("createdAt", NOW())
WHERE "updatedAt" IS NULL;


ALTER TABLE "Service"
ALTER COLUMN "number" SET NOT NULL;

ALTER TABLE "Service"
ALTER COLUMN "updatedAt" SET NOT NULL;


-- ============================================================
-- 4. Statistic
-- ============================================================

ALTER TABLE "Statistic"
ADD COLUMN IF NOT EXISTS "suffix" TEXT;

ALTER TABLE "Statistic"
ADD COLUMN IF NOT EXISTS "active" BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE "Statistic"
ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3);

ALTER TABLE "Statistic"
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3);


UPDATE "Statistic"
SET "createdAt" = NOW()
WHERE "createdAt" IS NULL;

UPDATE "Statistic"
SET "updatedAt" = NOW()
WHERE "updatedAt" IS NULL;


-- Eski TEXT value mavjud bo'lsa,
-- uni legacy sifatida saqlab qolamiz.
DO $$
DECLARE
  value_type TEXT;
BEGIN

  SELECT data_type
  INTO value_type
  FROM information_schema.columns
  WHERE table_name = 'Statistic'
    AND column_name = 'value';

  IF value_type = 'text' THEN

    ALTER TABLE "Statistic"
    RENAME COLUMN "value" TO "value_legacy";

    ALTER TABLE "Statistic"
    ADD COLUMN "value" INTEGER;

    UPDATE "Statistic"
    SET
      "suffix" =
        NULLIF(
          regexp_replace(
            "value_legacy",
            '^[0-9]+',
            '',
            'g'
          ),
          ''
        ),
      "value" =
        COALESCE(
          NULLIF(
            regexp_replace(
              "value_legacy",
              '[^0-9]',
              '',
              'g'
            ),
            ''
          )::INTEGER,
          0
        );

  END IF;

END $$;


-- Agar value yangi INT sifatida mavjud bo'lsa,
-- NULL qiymatlarni 0 qilamiz.
UPDATE "Statistic"
SET "value" = 0
WHERE "value" IS NULL;


ALTER TABLE "Statistic"
ALTER COLUMN "value" SET NOT NULL;

ALTER TABLE "Statistic"
ALTER COLUMN "createdAt" SET NOT NULL;

ALTER TABLE "Statistic"
ALTER COLUMN "updatedAt" SET NOT NULL;


-- ============================================================
-- 5. User
-- ============================================================

ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3);


UPDATE "User"
SET "updatedAt" = COALESCE("createdAt", NOW())
WHERE "updatedAt" IS NULL;


ALTER TABLE "User"
ALTER COLUMN "updatedAt" SET NOT NULL;


-- ============================================================
-- 6. SiteSettings
-- ============================================================

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "phone" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "instagram" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "telegram" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "email" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "address" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "workingHours" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "footerText" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "heroTitle" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "heroSubtitle" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "heroCtaText" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "heroCtaSecond" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "aboutTitle" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "aboutSubtitle" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "aboutText" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "aboutImage" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "contactTitle" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "contactText" TEXT;

ALTER TABLE "SiteSettings"
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3);


UPDATE "SiteSettings"
SET "updatedAt" = NOW()
WHERE "updatedAt" IS NULL;


ALTER TABLE "SiteSettings"
ALTER COLUMN "updatedAt" SET NOT NULL;


-- ============================================================
-- 7. TeamMember
-- ============================================================

CREATE TABLE IF NOT EXISTS "TeamMember" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "fullName" TEXT NOT NULL,
  "position" TEXT NOT NULL,
  "experience" TEXT,
  "photo" TEXT,
  "instagram" TEXT,
  "linkedin" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 8. LeadStatus
-- ============================================================

DO $$
BEGIN

  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'LeadStatus'
  ) THEN

    CREATE TYPE "LeadStatus" AS ENUM (
      'NEW',
      'IN_PROGRESS',
      'CONTACTED',
      'COMPLETED'
    );

  END IF;

END $$;


-- ============================================================
-- 9. Lead
-- ============================================================

CREATE TABLE IF NOT EXISTS "Lead" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "instagram" TEXT,
  "message" TEXT,
  "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
  "isRead" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT NOW()
);


COMMIT;
