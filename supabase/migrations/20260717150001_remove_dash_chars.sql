-- Replace en/em dashes with plain hyphens in DB-served text
-- (code side already updated; this fixes the rows inserted by 20260717150000)
UPDATE public.menu_categories SET description = REPLACE(REPLACE(description, '–', '-'), '—', '-');
UPDATE public.menu_items SET description = REPLACE(REPLACE(description, '–', '-'), '—', '-');
UPDATE public.drink_items SET description = REPLACE(REPLACE(description, '–', '-'), '—', '-');
UPDATE public.contact_info SET value = REPLACE(REPLACE(value, '–', '-'), '—', '-');
