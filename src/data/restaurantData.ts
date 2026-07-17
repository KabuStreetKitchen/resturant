export interface OpeningHour {
  id: string;
  day_of_week: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean | null;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  display_order: number | null;
}

export interface MenuCategory {
  id: string;
  name: string;
  image_url: string | null;
  description?: string | null;
  display_order: number | null;
  menu_items: MenuItem[];
}

export interface DrinkItem {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  display_order: number | null;
}

export interface DrinkCategory {
  id: string;
  name: string;
  image_url: string | null;
  display_order: number | null;
  drink_items: DrinkItem[];
}

export interface ContactInfo {
  id: string;
  type: string;
  label: string;
  value: string;
  display_order: number | null;
}

export interface KabulPlatteCourse {
  label: string;
  items: string;
}

export interface KabulPlatteOption {
  persons: string;
  price: number;
}

export interface KabulPlatte {
  title: string;
  subtitle: string;
  images: string[];
  courses: KabulPlatteCourse[];
  options: KabulPlatteOption[];
}

const displayOrder = (value: number | null) => value ?? Number.MAX_SAFE_INTEGER;

// Supabase is the content source of truth. Normalize ordering only; never
// reject a complete live response because an item happens to contain a word
// fragment (for example, "Classic" contains "lassi").
export const normalizeMenuCategories = (categories: MenuCategory[]): MenuCategory[] =>
  [...categories]
    .sort((a, b) => displayOrder(a.display_order) - displayOrder(b.display_order))
    .map((category) => ({
      ...category,
      menu_items: [...category.menu_items].sort(
        (a, b) => displayOrder(a.display_order) - displayOrder(b.display_order),
      ),
    }));

export const normalizeDrinkCategories = (categories: DrinkCategory[]): DrinkCategory[] =>
  [...categories]
    .sort((a, b) => displayOrder(a.display_order) - displayOrder(b.display_order))
    .map((category) => ({
      ...category,
      drink_items: [...category.drink_items].sort(
        (a, b) => displayOrder(a.display_order) - displayOrder(b.display_order),
      ),
    }));

export const fallbackOpeningHours: OpeningHour[] = [
  { day: "Monday",    open: "11:00:00", close: "22:00:00" },
  { day: "Tuesday",   open: "11:00:00", close: "22:00:00" },
  { day: "Wednesday", open: "11:00:00", close: "22:00:00" },
  { day: "Thursday",  open: "11:00:00", close: "22:00:00" },
  { day: "Friday",    open: "11:00:00", close: "00:00:00" },
  { day: "Saturday",  open: "11:00:00", close: "00:00:00" },
  { day: "Sunday",    open: "11:00:00", close: "22:00:00" },
].map(({ day, open, close }, index) => ({
  id: `fallback-hours-${index}`,
  day_of_week: day,
  open_time: open,
  close_time: close,
  is_closed: false,
}));

export const fallbackMenuCategories: MenuCategory[] = [
  {
    id: "fallback-vorspeisen",
    name: "Vorspeisen",
    image_url: "/assets/cat-vorspeisen.jpg",
    display_order: 1,
    description: "Knusprige Teigtaschen, frisches Fladenbrot und herzhafte Suppen – der Auftakt.",
    menu_items: [
      { id: "green-garden-salat", name: "Green Garden Salat", price: 5.5, display_order: 1, description: "Frischer gemischter Salat mit Gurken, Tomaten und hausgemachter Sauce." },
      { id: "sambosa", name: "Sambosa", price: 6.9, display_order: 2, description: "Knusprige Teigtaschen gefüllt mit Kartoffeln und Gewürzen. (4 Stück)" },
      { id: "ashak-deluxe", name: "Ashak Deluxe", price: 8.9, display_order: 3, description: "Traditionelle afghanische Lauch-Teigtaschen mit Joghurt und Linsensauce." },
      { id: "mantu-royale", name: "Mantu Royale", price: 9.9, display_order: 4, description: "Gedämpfte Teigtaschen mit Rinderhack, Joghurt und Linsensauce. (6 Stück)" },
      { id: "bolani-classic", name: "Bolani Classic", price: 7.9, display_order: 5, description: "Afghanisches Fladenbrot gefüllt mit Kartoffeln oder Lauch und Kräutern. (2 Stück · einzeln 4,00 €)" },
      { id: "burani-banjan", name: "Burani Banjan", price: 8.5, display_order: 6, description: "Gebratene Auberginen mit Knoblauch und Joghurtsauce." },
      { id: "pani-puri", name: "Pani Puri Street Style", price: 6.9, display_order: 7, description: "Knusprige Teigkugeln mit würziger Kräuterfüllung." },
      { id: "chicken-soul-soup", name: "Chicken Soul Soup", price: 5.0, display_order: 8, description: "Hausgemachte Hühnersuppe nach afghanischer Art." },
      { id: "shoor-nakhud", name: "Shoor Nakhud", price: 5.5, display_order: 9, description: "Würziger Kichererbsensalat mit frischen Kräutern und gekochten Kartoffeln." },
    ],
  },
  {
    id: "fallback-grill-teller",
    name: "Grill Teller",
    image_url: "/assets/cat-grill.jpg",
    display_order: 2,
    description: "Vom Holzkohlegrill – alle Grillteller mit Pommes, Chalau oder Kabuli Palaw.",
    menu_items: [
      { id: "shami-kingplatte", name: "Shami Kingplatte", price: 14.9, display_order: 1, description: "Würzige Hackfleischspieße vom Holzkohlegrill." },
      { id: "kottelet-masterplatte", name: "Kottelet Masterplatte", price: 24.9, display_order: 2, description: "Zarte Lammkoteletts vom Grill." },
      { id: "chicken-grillplatte", name: "Chicken Grillplatte", price: 14.5, display_order: 3, description: "Gegrillte Hähnchenstücke." },
      { id: "tikka-kabab", name: "Tikka Kabab", price: 14.9, display_order: 4, description: "Mariniertes Lammfleisch vom Holzkohlegrill." },
      { id: "crazy-wingsplatte", name: "Crazy Wingsplatte", price: 14.9, display_order: 5, description: "Knusprige Hähnchenflügel mit Grillgewürzen. (scharf)" },
      { id: "half-chickenplatte", name: "Half Chickenplatte", price: 12.9, display_order: 6, description: "Halbes gegrilltes Hähnchen." },
      { id: "full-chickenplatte", name: "Full Chickenplatte", price: 17.9, display_order: 7, description: "Ganzes gegrilltes Hähnchen." },
    ],
  },
  {
    id: "fallback-reis-karahi",
    name: "Reisgerichte & Karahi",
    image_url: "/assets/cat-reis.jpg",
    display_order: 3,
    description: "Traditioneller Kabuli Palaw und würzige Karahi-Pfannen.",
    menu_items: [
      { id: "kabuli-palaw-royal", name: "Kabuli Palaw Royal", price: 14.9, display_order: 1, description: "Traditioneller Kabuli Palaw mit zartem Lammfleisch." },
      { id: "mahicha-palaw", name: "Mahicha Palaw", price: 17.5, display_order: 2, description: "Traditioneller Kabuli Palaw mit Lammhaxe." },
      { id: "karahi-lamm", name: "Karahi Lamm", price: 23.9, display_order: 3, description: "Zartes Lammfleisch in würziger Karahi-Pfanne." },
      { id: "karahi-haehnchen", name: "Karahi Hähnchen", price: 18.9, display_order: 4, description: "Mariniertes Hähnchenfleisch in würziger Karahi-Pfanne." },
    ],
  },
  {
    id: "fallback-grill-spezial",
    name: "Holzkohlegrill Spezial",
    image_url: "/assets/cat-barbecue.jpg",
    display_order: 4,
    description: "Frisch vom Holzkohlegrill – serviert mit Naan und Salat.",
    menu_items: [
      { id: "shami-grill", name: "Shami Grill", price: 14.5, display_order: 1, description: "Afghanische Hackfleischspieße frisch vom Holzkohlegrill. (2 Spieße)" },
      { id: "tikka-grill", name: "Tikka Grill", price: 15.5, display_order: 2, description: "Afghanisches Lammfleisch vom Holzkohlegrill. (2 Spieße)" },
      { id: "chicken-tikka", name: "Chicken Tikka", price: 13.9, display_order: 3, description: "Ganzes gegrilltes Hähnchen." },
      { id: "half-chicken", name: "Half Chicken", price: 8.5, display_order: 4, description: "Halbes gegrilltes Hähnchen." },
      { id: "full-chicken", name: "Full Chicken", price: 13.5, display_order: 5, description: "Ganzes gegrilltes Hähnchen." },
    ],
  },
  {
    id: "fallback-doener",
    name: "Döner",
    image_url: "/assets/cat-doener.jpg",
    display_order: 5,
    description: "Im Fladenbrot, als Teller oder in der Box – nach afghanischer Art.",
    menu_items: [
      { id: "doener-kalb", name: "Döner Kalb", price: 7.5, display_order: 1, description: "Saftiges Kalbfleisch im Fladenbrot mit Salat und Sauce." },
      { id: "doener-haehnchen", name: "Döner Hähnchen", price: 7.5, display_order: 2, description: "Mariniertes Hähnchenfleisch im Fladenbrot mit Salat und Sauce." },
      { id: "doener-teller", name: "Döner Teller", price: 10.0, display_order: 3, description: "Dönerfleisch mit Salat und Pommes oder Reis." },
      { id: "doener-box", name: "Döner Box", price: 7.0, display_order: 4, description: "Dönerfleisch mit Pommes oder Reis im Becher." },
      { id: "kabul-doener-spezial", name: "Kabul Döner Spezial", price: 9.9, display_order: 5, description: "Döner nach afghanischer Art mit Spezialgewürzen und hausgemachter Sauce." },
    ],
  },
  {
    id: "fallback-wraps",
    name: "Wraps & Spezials",
    image_url: "/assets/cat-wraps.jpg",
    display_order: 6,
    description: "Vom Grill in den Wrap – mit Salat und hausgemachter Sauce.",
    menu_items: [
      { id: "shami-wrap", name: "Shami Wrap", price: 8.9, display_order: 1, description: "Gegrilltes Hackfleisch im Wrap mit Salat und Sauce." },
      { id: "tikka-wrap", name: "Tikka Wrap", price: 9.9, display_order: 2, description: "Mariniertes Lammfleisch vom Holzkohlegrill im Wrap mit Salat und Sauce." },
      { id: "chicken-grill-wrap", name: "Chicken Grill Wrap", price: 8.9, display_order: 3, description: "Gegrilltes Hähnchenfleisch mit Salat und hausgemachter Sauce." },
      { id: "afghan-burger", name: "Afghan Burger", price: 7.0, display_order: 4, description: "Saftiger Burger mit Salat, Tomaten und Spezialsauce." },
    ],
  },
  {
    id: "fallback-street-pizza",
    name: "Street Pizza",
    image_url: "/assets/cat-pizza.jpg",
    display_order: 7,
    description: "30 cm, frisch belegt – von Margherita bis Kabul Spezial Tikka.",
    menu_items: [
      { id: "pizza-margherita", name: "Margherita", price: 7.0, display_order: 1, description: "Tomatensauce, Käse und Basilikum." },
      { id: "pizza-doener-fusion", name: "Döner Fusion Pizza", price: 12.9, display_order: 2, description: "Mit Kalb- oder Hähnchen-Dönerfleisch und Käse." },
      { id: "pizza-veggie", name: "Veggie Pizza", price: 10.0, display_order: 3, description: "Frisches Gemüse und Käse." },
      { id: "pizza-spinat", name: "Spinat Pizza", price: 10.0, display_order: 4, description: "Spinat und Käse." },
      { id: "pizza-tonno", name: "Tonno Pizza", price: 10.0, display_order: 5, description: "Thunfisch und Käse." },
      { id: "pizza-beef-salami", name: "Beef Salami", price: 12.0, display_order: 6, description: "Rindersalami und Käse." },
      { id: "pizza-kabul-tikka", name: "Kabul Spezial Tikka", price: 14.9, display_order: 7, description: "Chicken- oder Lamm-Tikka mit orientalischen Gewürzen und Käse." },
    ],
  },
  {
    id: "fallback-beilagen-kids",
    name: "Beilagen & Kids",
    image_url: "/assets/cat-beilagen.jpg",
    display_order: 8,
    description: "Für die Kleinen und für den Hunger zwischendurch.",
    menu_items: [
      { id: "kids-menu", name: "Kids Menü", price: 7.0, display_order: 1, description: "5 Nuggets, Pommes, Capri-Sonne und ein Spielzeug." },
      { id: "street-fries-klein", name: "Street Fries Klein", price: 3.5, display_order: 2, description: "Knusprige Pommes Frites (mit Ketchup oder Mayo)." },
      { id: "street-fries-gross", name: "Street Fries Groß", price: 4.5, display_order: 3, description: "Knusprige Pommes Frites (mit Ketchup oder Mayo)." },
    ],
  },
  {
    id: "fallback-saucen",
    name: "Saucen",
    image_url: "/assets/cat-saucen.jpg",
    display_order: 9,
    description: "Hausgemachte Chutneys und Saucen – je 1,00 €.",
    menu_items: [
      { id: "sauce-gruene-chutney", name: "Grüne Chutney", price: 1.0, display_order: 1, description: "Peperoni, frische Kräuter und Minzsauce." },
      { id: "sauce-rote-chutney", name: "Rote Chutney", price: 1.0, display_order: 2, description: "Rote Peperoni, frische Kräuter und Chilisauce." },
      { id: "sauce-joghurt-chutney", name: "Joghurt Chutney", price: 1.0, display_order: 3, description: "Peperoni, milder Joghurt und Kräutersauce." },
      { id: "sauce-doener", name: "Döner Sauce", price: 1.0, display_order: 4, description: "Hausgemachte Knoblauchsauce." },
      { id: "sauce-kabul-spezial", name: "Kabul Spezial Chutney", price: 1.0, display_order: 5, description: "Scharfe Spezialsoße nach Hausrezept. (scharf)" },
    ],
  },
  {
    id: "fallback-dessert",
    name: "Dessert",
    image_url: "/assets/cat-dessert.jpg",
    display_order: 10,
    description: "Süßer Abschluss mit Kardamom, Nüssen und Honig.",
    menu_items: [
      { id: "firni", name: "Firni", price: 3.9, display_order: 1, description: "Traditioneller afghanischer Milchpudding mit Kardamom." },
      { id: "baklava", name: "Baklava", price: 4.9, display_order: 2, description: "Blätterteiggebäck mit Nüssen und Honigsirup. (2 Stück)" },
    ],
  },
];

export const fallbackDrinkCategories: DrinkCategory[] = [
  {
    id: "fallback-getraenke",
    name: "Getränke",
    image_url: "/assets/cat-getraenke.jpg",
    display_order: 1,
    drink_items: [
      { id: "cola-zero-fanta", name: "Coca-Cola · Zero · Fanta", price: 2.5, display_order: 1 },
      { id: "afghan-doogh", name: "Afghan Doogh", price: 2.5, display_order: 2 },
      { id: "ayran", name: "Ayran", price: 2.0, display_order: 3 },
      { id: "wasser", name: "Stilles Wasser · mit Kohlensäure", price: 2.0, display_order: 4 },
      { id: "gruentee", name: "Grüntee", price: 0.5, display_order: 5 },
      { id: "schwarztee", name: "Schwarztee", price: 0.5, display_order: 6 },
      { id: "tee-2-personen", name: "Tee für 2 Personen", price: 5.0, display_order: 7, description: "Grün-, Schwarz- oder Safrantee mit Kardamom." },
    ],
  },
];

export const fallbackKabulPlatte: KabulPlatte = {
  title: "Kabul Platte",
  subtitle: "Das perfekte Erlebnis",
  images: ["/assets/dish-mixkabab.jpg", "/assets/dish-kofta.jpg", "/assets/dish-jalebi.jpg"],
  courses: [
    { label: "Vorspeise", items: "Mantu · Ashak · Afghan Chicken Soup" },
    { label: "Hauptspeise", items: "Verschiedene Kebabsorten · Reis · Pommes · Salat" },
    { label: "Nachspeise", items: "Firni · Baklava · Jalebi" },
  ],
  options: [
    { persons: "2 Personen", price: 54.9 },
    { persons: "3 Personen", price: 75.9 },
    { persons: "4 Personen", price: 104.9 },
  ],
};

export const fallbackContactInfo: ContactInfo[] = [
  { id: "phone", type: "phone", label: "Telefon", value: "0201 55796045", display_order: 1 },
  { id: "address", type: "address", label: "Adresse", value: "Kreuzeskirchstraße 21, 45127 Essen", display_order: 2 },
  { id: "email", type: "email", label: "E-Mail", value: "kabul.street.kitchen@gmail.com", display_order: 3 },
  { id: "instagram", type: "social", label: "Instagram", value: "@kabulstreetkitchen", display_order: 4 },
  { id: "facebook", type: "social", label: "Facebook", value: "Kabul Street Kitchen", display_order: 5 },
  { id: "tiktok", type: "social", label: "TikTok", value: "tiktok.com/@kabulstreetkitchen", display_order: 6 },
  { id: "imprint", type: "imprint", label: "Impressum", value: "Kabul Street Kitchen GmbH", display_order: 7 },
  { id: "delivery", type: "delivery_time", label: "Lieferzeit", value: "30–45 Minuten", display_order: 8 },
];

export const dayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
