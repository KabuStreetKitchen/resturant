-- Keep public restaurant content synchronized with connected clients.

ALTER TABLE public.drink_items
  ADD COLUMN IF NOT EXISTS description TEXT;

-- Supabase Realtime only emits postgres_changes for tables in the
-- supabase_realtime publication. Guard every addition so this remains safe on
-- local Postgres installations and projects where a table is already added.
DO $$
DECLARE
  content_table TEXT;
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    FOREACH content_table IN ARRAY ARRAY[
      'opening_hours',
      'menu_categories',
      'menu_items',
      'drink_categories',
      'drink_items',
      'contact_info'
    ]
    LOOP
      IF NOT EXISTS (
        SELECT 1
        FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
          AND schemaname = 'public'
          AND tablename = content_table
      ) THEN
        EXECUTE format(
          'ALTER PUBLICATION supabase_realtime ADD TABLE public.%I',
          content_table
        );
      END IF;
    END LOOP;
  END IF;
END
$$;

-- Remove the exact legacy seed categories from the former restaurant. Child
-- items are removed through ON DELETE CASCADE. No user-created category is
-- matched by a broad pattern.
DELETE FROM public.menu_categories
WHERE name IN ('Afghan Starters', 'Salads', 'Afghan Mains', 'Pasta', 'Desserts');

DELETE FROM public.drink_categories
WHERE name IN ('Beer', 'Wine', 'Yogurt Drinks', 'Tea & Coffee', 'Soft Drinks');

INSERT INTO public.opening_hours (day_of_week, open_time, close_time, is_closed)
VALUES
  ('Monday',    '11:00', '22:00', false),
  ('Tuesday',   '11:00', '22:00', false),
  ('Wednesday', '11:00', '22:00', false),
  ('Thursday',  '11:00', '22:00', false),
  ('Friday',    '11:00', '00:00', false),
  ('Saturday',  '11:00', '00:00', false),
  ('Sunday',    '11:00', '22:00', false)
ON CONFLICT (day_of_week) DO UPDATE SET
  open_time = EXCLUDED.open_time,
  close_time = EXCLUDED.close_time,
  is_closed = EXCLUDED.is_closed;

INSERT INTO public.menu_categories (name, image_url, description, display_order)
VALUES
  ('Vorspeisen', '/assets/cat-vorspeisen.jpg', 'Knusprige Teigtaschen, frisches Fladenbrot und herzhafte Suppen – der Auftakt.', 1),
  ('Grill Teller', '/assets/cat-grill.jpg', 'Vom Holzkohlegrill – alle Grillteller mit Pommes, Chalau oder Kabuli Palaw.', 2),
  ('Reisgerichte & Karahi', '/assets/cat-reis.jpg', 'Traditioneller Kabuli Palaw und würzige Karahi-Pfannen.', 3),
  ('Holzkohlegrill Spezial', '/assets/cat-barbecue.jpg', 'Frisch vom Holzkohlegrill – serviert mit Naan und Salat.', 4),
  ('Döner', '/assets/cat-doener.jpg', 'Im Fladenbrot, als Teller oder in der Box – nach afghanischer Art.', 5),
  ('Wraps & Spezials', '/assets/cat-wraps.jpg', 'Vom Grill in den Wrap – mit Salat und hausgemachter Sauce.', 6),
  ('Street Pizza', '/assets/cat-pizza.jpg', '30 cm, frisch belegt – von Margherita bis Kabul Spezial Tikka.', 7),
  ('Beilagen & Kids', '/assets/cat-beilagen.jpg', 'Für die Kleinen und für den Hunger zwischendurch.', 8),
  ('Saucen', '/assets/cat-saucen.jpg', 'Hausgemachte Chutneys und Saucen – je 1,00 €.', 9),
  ('Dessert', '/assets/cat-dessert.jpg', 'Süßer Abschluss mit Kardamom, Nüssen und Honig.', 10)
ON CONFLICT (name) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  description = EXCLUDED.description,
  display_order = EXCLUDED.display_order;

WITH item_seed(category_name, name, price, description, display_order) AS (
  VALUES
    ('Vorspeisen', 'Green Garden Salat', 5.50, 'Frischer gemischter Salat mit Gurken, Tomaten und hausgemachter Sauce.', 1),
    ('Vorspeisen', 'Sambosa', 6.90, 'Knusprige Teigtaschen gefüllt mit Kartoffeln und Gewürzen. (4 Stück)', 2),
    ('Vorspeisen', 'Ashak Deluxe', 8.90, 'Traditionelle afghanische Lauch-Teigtaschen mit Joghurt und Linsensauce.', 3),
    ('Vorspeisen', 'Mantu Royale', 9.90, 'Gedämpfte Teigtaschen mit Rinderhack, Joghurt und Linsensauce. (6 Stück)', 4),
    ('Vorspeisen', 'Bolani Classic', 7.90, 'Afghanisches Fladenbrot gefüllt mit Kartoffeln oder Lauch und Kräutern. (2 Stück · einzeln 4,00 €)', 5),
    ('Vorspeisen', 'Burani Banjan', 8.50, 'Gebratene Auberginen mit Knoblauch und Joghurtsauce.', 6),
    ('Vorspeisen', 'Pani Puri Street Style', 6.90, 'Knusprige Teigkugeln mit würziger Kräuterfüllung.', 7),
    ('Vorspeisen', 'Chicken Soul Soup', 5.00, 'Hausgemachte Hühnersuppe nach afghanischer Art.', 8),
    ('Vorspeisen', 'Shoor Nakhud', 5.50, 'Würziger Kichererbsensalat mit frischen Kräutern und gekochten Kartoffeln.', 9),
    ('Grill Teller', 'Shami Kingplatte', 14.90, 'Würzige Hackfleischspieße vom Holzkohlegrill.', 1),
    ('Grill Teller', 'Kottelet Masterplatte', 24.90, 'Zarte Lammkoteletts vom Grill.', 2),
    ('Grill Teller', 'Chicken Grillplatte', 14.50, 'Gegrillte Hähnchenstücke.', 3),
    ('Grill Teller', 'Tikka Kabab', 14.90, 'Mariniertes Lammfleisch vom Holzkohlegrill.', 4),
    ('Grill Teller', 'Crazy Wingsplatte', 14.90, 'Knusprige Hähnchenflügel mit Grillgewürzen. (scharf)', 5),
    ('Grill Teller', 'Half Chickenplatte', 12.90, 'Halbes gegrilltes Hähnchen.', 6),
    ('Grill Teller', 'Full Chickenplatte', 17.90, 'Ganzes gegrilltes Hähnchen.', 7),
    ('Reisgerichte & Karahi', 'Kabuli Palaw Royal', 14.90, 'Traditioneller Kabuli Palaw mit zartem Lammfleisch.', 1),
    ('Reisgerichte & Karahi', 'Mahicha Palaw', 17.50, 'Traditioneller Kabuli Palaw mit Lammhaxe.', 2),
    ('Reisgerichte & Karahi', 'Karahi Lamm', 23.90, 'Zartes Lammfleisch in würziger Karahi-Pfanne.', 3),
    ('Reisgerichte & Karahi', 'Karahi Hähnchen', 18.90, 'Mariniertes Hähnchenfleisch in würziger Karahi-Pfanne.', 4),
    ('Holzkohlegrill Spezial', 'Shami Grill', 14.50, 'Afghanische Hackfleischspieße frisch vom Holzkohlegrill. (2 Spieße)', 1),
    ('Holzkohlegrill Spezial', 'Tikka Grill', 15.50, 'Afghanisches Lammfleisch vom Holzkohlegrill. (2 Spieße)', 2),
    ('Holzkohlegrill Spezial', 'Chicken Tikka', 13.90, 'Ganzes gegrilltes Hähnchen.', 3),
    ('Holzkohlegrill Spezial', 'Half Chicken', 8.50, 'Halbes gegrilltes Hähnchen.', 4),
    ('Holzkohlegrill Spezial', 'Full Chicken', 13.50, 'Ganzes gegrilltes Hähnchen.', 5),
    ('Döner', 'Döner Kalb', 7.50, 'Saftiges Kalbfleisch im Fladenbrot mit Salat und Sauce.', 1),
    ('Döner', 'Döner Hähnchen', 7.50, 'Mariniertes Hähnchenfleisch im Fladenbrot mit Salat und Sauce.', 2),
    ('Döner', 'Döner Teller', 10.00, 'Dönerfleisch mit Salat und Pommes oder Reis.', 3),
    ('Döner', 'Döner Box', 7.00, 'Dönerfleisch mit Pommes oder Reis im Becher.', 4),
    ('Döner', 'Kabul Döner Spezial', 9.90, 'Döner nach afghanischer Art mit Spezialgewürzen und hausgemachter Sauce.', 5),
    ('Wraps & Spezials', 'Shami Wrap', 8.90, 'Gegrilltes Hackfleisch im Wrap mit Salat und Sauce.', 1),
    ('Wraps & Spezials', 'Tikka Wrap', 9.90, 'Mariniertes Lammfleisch vom Holzkohlegrill im Wrap mit Salat und Sauce.', 2),
    ('Wraps & Spezials', 'Chicken Grill Wrap', 8.90, 'Gegrilltes Hähnchenfleisch mit Salat und hausgemachter Sauce.', 3),
    ('Wraps & Spezials', 'Afghan Burger', 7.00, 'Saftiger Burger mit Salat, Tomaten und Spezialsauce.', 4),
    ('Street Pizza', 'Margherita', 7.00, 'Tomatensauce, Käse und Basilikum.', 1),
    ('Street Pizza', 'Döner Fusion Pizza', 12.90, 'Mit Kalb- oder Hähnchen-Dönerfleisch und Käse.', 2),
    ('Street Pizza', 'Veggie Pizza', 10.00, 'Frisches Gemüse und Käse.', 3),
    ('Street Pizza', 'Spinat Pizza', 10.00, 'Spinat und Käse.', 4),
    ('Street Pizza', 'Tonno Pizza', 10.00, 'Thunfisch und Käse.', 5),
    ('Street Pizza', 'Beef Salami', 12.00, 'Rindersalami und Käse.', 6),
    ('Street Pizza', 'Kabul Spezial Tikka', 14.90, 'Chicken- oder Lamm-Tikka mit orientalischen Gewürzen und Käse.', 7),
    ('Beilagen & Kids', 'Kids Menü', 7.00, '5 Nuggets, Pommes, Capri-Sonne und ein Spielzeug.', 1),
    ('Beilagen & Kids', 'Street Fries Klein', 3.50, 'Knusprige Pommes Frites (mit Ketchup oder Mayo).', 2),
    ('Beilagen & Kids', 'Street Fries Groß', 4.50, 'Knusprige Pommes Frites (mit Ketchup oder Mayo).', 3),
    ('Saucen', 'Grüne Chutney', 1.00, 'Peperoni, frische Kräuter und Minzsauce.', 1),
    ('Saucen', 'Rote Chutney', 1.00, 'Rote Peperoni, frische Kräuter und Chilisauce.', 2),
    ('Saucen', 'Joghurt Chutney', 1.00, 'Peperoni, milder Joghurt und Kräutersauce.', 3),
    ('Saucen', 'Döner Sauce', 1.00, 'Hausgemachte Knoblauchsauce.', 4),
    ('Saucen', 'Kabul Spezial Chutney', 1.00, 'Scharfe Spezialsoße nach Hausrezept. (scharf)', 5),
    ('Dessert', 'Firni', 3.90, 'Traditioneller afghanischer Milchpudding mit Kardamom.', 1),
    ('Dessert', 'Baklava', 4.90, 'Blätterteiggebäck mit Nüssen und Honigsirup. (2 Stück)', 2)
)
INSERT INTO public.menu_items (category_id, name, price, description, display_order)
SELECT category.id, seed.name, seed.price, seed.description, seed.display_order
FROM item_seed AS seed
JOIN public.menu_categories AS category ON category.name = seed.category_name
ON CONFLICT (category_id, name) DO UPDATE SET
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  display_order = EXCLUDED.display_order;

INSERT INTO public.drink_categories (name, image_url, display_order)
VALUES ('Getränke', '/assets/cat-getraenke.jpg', 1)
ON CONFLICT (name) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  display_order = EXCLUDED.display_order;

WITH drink_seed(name, price, description, display_order) AS (
  VALUES
    ('Coca-Cola · Zero · Fanta', 2.50, NULL::TEXT, 1),
    ('Afghan Doogh', 2.50, NULL::TEXT, 2),
    ('Ayran', 2.00, NULL::TEXT, 3),
    ('Stilles Wasser · mit Kohlensäure', 2.00, NULL::TEXT, 4),
    ('Grüntee', 0.50, NULL::TEXT, 5),
    ('Schwarztee', 0.50, NULL::TEXT, 6),
    ('Tee für 2 Personen', 5.00, 'Grün-, Schwarz- oder Safrantee mit Kardamom.', 7)
)
INSERT INTO public.drink_items (category_id, name, price, description, display_order)
SELECT category.id, seed.name, seed.price, seed.description, seed.display_order
FROM drink_seed AS seed
JOIN public.drink_categories AS category ON category.name = 'Getränke'
ON CONFLICT (category_id, name) DO UPDATE SET
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  display_order = EXCLUDED.display_order;

INSERT INTO public.contact_info (type, label, value, display_order)
VALUES
  ('phone', 'Telefon', '0201 55796045', 1),
  ('address', 'Adresse', 'Kreuzeskirchstraße 21, 45127 Essen', 2),
  ('email', 'E-Mail', 'kabul.street.kitchen@gmail.com', 3),
  ('social', 'Instagram', '@kabulstreetkitchen', 4),
  ('social', 'Facebook', 'Kabul Street Kitchen', 5),
  ('social', 'TikTok', 'tiktok.com/@kabulstreetkitchen', 6),
  ('imprint', 'Impressum', 'Kabul Street Kitchen GmbH', 7),
  ('delivery_time', 'Lieferzeit', '30–45 Minuten', 8)
ON CONFLICT (type, label) DO UPDATE SET
  value = EXCLUDED.value,
  display_order = EXCLUDED.display_order;
