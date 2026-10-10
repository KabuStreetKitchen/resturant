// Lightweight, dependency-free i18n for the Kabul Street Kitchen site.
//
// Scope: UI chrome only (navigation, headings, marketing copy, buttons, labels).
// The actual menu/drink items and their descriptions stay in their original
// German/Afghan wording – dish names like "Kabuli Palaw", "Karahi" or "Döner"
// are proper nouns guests search for, so they are intentionally NOT translated.

export type LanguageCode =
  | "de"
  | "en"
  | "ar"
  | "prs"
  | "zh"
  | "ja"
  | "hi"
  | "nl"
  | "fr"
  | "it"
  | "es"
  | "el";

export const DEFAULT_LANGUAGE: LanguageCode = "de";

export interface LanguageMeta {
  code: LanguageCode;
  /** Native name shown in the switcher. */
  label: string;
  /** English name, handy for aria/debugging. */
  englishName: string;
  flag: string;
  dir: "ltr" | "rtl";
  /** BCP-47 locale used for the <html lang> attribute and Intl formatting. */
  intlLocale: string;
}

// German first → it is the default and the source of truth for the schema.
export const languages: LanguageMeta[] = [
  { code: "de", label: "Deutsch", englishName: "German", flag: "🇩🇪", dir: "ltr", intlLocale: "de" },
  { code: "en", label: "English", englishName: "English", flag: "🇬🇧", dir: "ltr", intlLocale: "en" },
  { code: "ar", label: "العربية", englishName: "Arabic", flag: "🇸🇦", dir: "rtl", intlLocale: "ar" },
  { code: "prs", label: "دری", englishName: "Dari", flag: "🇦🇫", dir: "rtl", intlLocale: "fa-AF" },
  { code: "zh", label: "中文", englishName: "Chinese", flag: "🇨🇳", dir: "ltr", intlLocale: "zh" },
  { code: "ja", label: "日本語", englishName: "Japanese", flag: "🇯🇵", dir: "ltr", intlLocale: "ja" },
  { code: "hi", label: "हिन्दी", englishName: "Hindi", flag: "🇮🇳", dir: "ltr", intlLocale: "hi" },
  { code: "nl", label: "Nederlands", englishName: "Dutch", flag: "🇳🇱", dir: "ltr", intlLocale: "nl" },
  { code: "fr", label: "Français", englishName: "French", flag: "🇫🇷", dir: "ltr", intlLocale: "fr" },
  { code: "it", label: "Italiano", englishName: "Italian", flag: "🇮🇹", dir: "ltr", intlLocale: "it" },
  { code: "es", label: "Español", englishName: "Spanish", flag: "🇪🇸", dir: "ltr", intlLocale: "es" },
  { code: "el", label: "Ελληνικά", englishName: "Greek", flag: "🇬🇷", dir: "ltr", intlLocale: "el" },
];

// German is the canonical schema; every other language must provide the same keys.
const de = {
  nav: {
    start: "Start",
    menu: "Speisekarte",
    drinks: "Getränke",
    story: "Geschichte",
    contact: "Kontakt",
    logoSubtitle: "Vom Holzkohlegrill",
    homeAria: "Kabul Street Kitchen Startseite",
    toggleAria: "Navigation umschalten",
    language: "Sprache",
  },
  hours: {
    today: "Heute",
    openToday: "Geöffnet",
    closed: "Geschlossen",
  },
  hero: {
    badgeCharcoal: "Holzkohlegrill",
    badgeKitchen: "Afghanische Kabul Street Kitchen",
    subtitle: "Authentische afghanische Kabul Street Kitchen – vom Holzkohlegrill.",
    support:
      "Frisch und mit Herz zubereitet: würzige Kebabspieße, Kabuli Palaw, Karahi und Döner – die Aromen Kabuls direkt vom Grill auf deinen Teller.",
    cta: "Speisekarte ansehen",
    directions: "Route anzeigen",
  },
  eat: {
    badge: "Küche · Holzkohlegrill",
    title: "Speisekarte",
    intro:
      "Vom Holzkohlegrill, frisch und mit Herz zubereitet: Kebabspieße, Kabuli Palaw, Karahi, Döner und Street Pizza – authentische Aromen aus Kabul.",
    categoryFallback: "Hausgemacht und frisch zubereitet.",
    prep: "Zubereitung",
    prepValue: "Vom Holzkohlegrill",
    service: "Service",
    serviceValue: "Abholung & Lieferung",
    forKids: "Für die Kleinen",
    kidsMenu: "Kids Menü",
  },
  drink: {
    house: "Hausgetränke",
    houseHeading: "Heißer Chai mit Kardamom, frischer Doogh und Ayran.",
    badge: "Bar",
    title: "Getränke",
    intro:
      "Erfrischend und traditionell – afghanischer Tee, Joghurtgetränke und kühle Klassiker zu jedem Gericht.",
    chaiValue: "Würzig",
    dooghValue: "Frisch",
    ayranValue: "Kühl",
  },
  team: {
    badge: "Unsere Geschichte",
    title: "Vom Holzkohlegrill",
    p1: "Kabul Street Kitchen bringt die Aromen der afghanischen Kabul Street Kitchen direkt zu dir – so, wie man sie an den Garküchen und Basaren Kabuls kennt und liebt.",
    p2: "Im Mittelpunkt steht der Holzkohlegrill: Über glühenden Kohlen entstehen würzige Kebabspieße, zarte Koteletts und saftiges Hähnchen – frisch und mit Herz zubereitet, ergänzt um traditionellen Kabuli Palaw, Karahi und hausgemachte Teigtaschen.",
    craftLabel: "Unser Handwerk",
    craftValue: "Echtes Holzkohlefeuer",
    standardLabel: "Unser Anspruch",
    standardValue: "Frisch & authentisch",
    grillLabel: "Am Grill",
    grillValue: "Afghanische Tradition, frisch über der Kohle.",
  },
  contact: {
    badge: "Besuch uns",
    title: "Kontakt",
    intro: "Bestell zur Abholung, lass dir das Essen liefern oder ruf uns einfach an.",
    call: "Anrufen",
    brandTagline: "Vom Holzkohlegrill direkt in deine Stadt.",
    cardTagline: "Authentische afghanische Kabul Street Kitchen.",
    socialMedia: "Social Media",
    labelPhone: "Telefon",
    labelAddress: "Adresse",
    labelEmail: "E-Mail",
    labelDelivery: "Lieferzeit",
  },
  error: {
    title: "Etwas ist schiefgelaufen",
    body: "Bitte lade die Seite neu, um es erneut zu versuchen.",
  },
} as const;

export type TranslationSchema = {
  -readonly [K in keyof typeof de]: { -readonly [P in keyof (typeof de)[K]]: string };
};

const en: TranslationSchema = {
  nav: {
    start: "Home",
    menu: "Menu",
    drinks: "Drinks",
    story: "Our Story",
    contact: "Contact",
    logoSubtitle: "From the Charcoal Grill",
    homeAria: "Kabul Street Kitchen home",
    toggleAria: "Toggle navigation",
    language: "Language",
  },
  hours: { today: "Today", openToday: "Open", closed: "Closed" },
  hero: {
    badgeCharcoal: "Charcoal Grill",
    badgeKitchen: "Afghan Kabul Street Kitchen",
    subtitle: "Authentic Afghan Kabul Street Kitchen – from the charcoal grill.",
    support:
      "Freshly prepared with heart: spicy kebab skewers, Kabuli Palaw, Karahi and Döner – the flavours of Kabul straight from the grill to your plate.",
    cta: "View menu",
    directions: "Get directions",
  },
  eat: {
    badge: "Kitchen · Charcoal Grill",
    title: "Menu",
    intro:
      "From the charcoal grill, freshly prepared with heart: kebab skewers, Kabuli Palaw, Karahi, Döner and Street Pizza – authentic flavours from Kabul.",
    categoryFallback: "Homemade and freshly prepared.",
    prep: "Preparation",
    prepValue: "From the charcoal grill",
    service: "Service",
    serviceValue: "Pickup & delivery",
    forKids: "For the little ones",
    kidsMenu: "Kids menu",
  },
  drink: {
    house: "House drinks",
    houseHeading: "Hot chai with cardamom, fresh Doogh and Ayran.",
    badge: "Bar",
    title: "Drinks",
    intro:
      "Refreshing and traditional – Afghan tea, yoghurt drinks and cool classics for every dish.",
    chaiValue: "Spicy",
    dooghValue: "Fresh",
    ayranValue: "Cool",
  },
  team: {
    badge: "Our Story",
    title: "From the Charcoal Grill",
    p1: "Kabul Street Kitchen brings the flavours of Afghan cuisine straight to you – just the way they are known and loved at the food stalls and bazaars of Kabul.",
    p2: "At the heart of it all is the charcoal grill: over glowing coals we create spicy kebab skewers, tender cutlets and juicy chicken – freshly prepared with heart, rounded out by traditional Kabuli Palaw, Karahi and homemade dumplings.",
    craftLabel: "Our Craft",
    craftValue: "Real charcoal fire",
    standardLabel: "Our Standard",
    standardValue: "Fresh & authentic",
    grillLabel: "At the Grill",
    grillValue: "Afghan tradition, fresh over the coals.",
  },
  contact: {
    badge: "Visit us",
    title: "Contact",
    intro: "Order for pickup, have your food delivered or simply give us a call.",
    call: "Call us",
    brandTagline: "From the charcoal grill straight to your city.",
    cardTagline: "Authentic Afghan Kabul Street Kitchen.",
    socialMedia: "Social Media",
    labelPhone: "Phone",
    labelAddress: "Address",
    labelEmail: "Email",
    labelDelivery: "Delivery time",
  },
  error: {
    title: "Something went wrong",
    body: "Please reload the page to try again.",
  },
};

const ar: TranslationSchema = {
  nav: {
    start: "الرئيسية",
    menu: "قائمة الطعام",
    drinks: "المشروبات",
    story: "قصتنا",
    contact: "اتصل بنا",
    logoSubtitle: "من شواية الفحم",
    homeAria: "الصفحة الرئيسية لمطبخ كابول ستريت",
    toggleAria: "تبديل القائمة",
    language: "اللغة",
  },
  hours: { today: "اليوم", openToday: "مفتوح", closed: "مغلق" },
  hero: {
    badgeCharcoal: "شواية الفحم",
    badgeKitchen: "مطبخ كابول ستريت الأفغاني",
    subtitle: "مطبخ كابول ستريت الأفغاني الأصيل – من شواية الفحم.",
    support:
      "محضّر طازجًا وبكل حب: أسياخ كباب متبّلة، كابلي بلو، كراهي ودونر – نكهات كابول من الشواية مباشرة إلى طبقك.",
    cta: "عرض القائمة",
    directions: "عرض الاتجاهات",
  },
  eat: {
    badge: "المطبخ · شواية الفحم",
    title: "قائمة الطعام",
    intro:
      "من شواية الفحم، محضّر طازجًا وبكل حب: أسياخ الكباب، كابلي بلو، كراهي، دونر وبيتزا الشارع – نكهات أصيلة من كابول.",
    categoryFallback: "محضّر منزليًا وطازجًا.",
    prep: "التحضير",
    prepValue: "من شواية الفحم",
    service: "الخدمة",
    serviceValue: "استلام وتوصيل",
    forKids: "للصغار",
    kidsMenu: "قائمة الأطفال",
  },
  drink: {
    house: "مشروبات المطعم",
    houseHeading: "شاي ساخن بالهيل، دوغ طازج وعيران.",
    badge: "البار",
    title: "المشروبات",
    intro: "منعشة وتقليدية – شاي أفغاني، مشروبات الزبادي وكلاسيكيات باردة لكل طبق.",
    chaiValue: "متبّل",
    dooghValue: "طازج",
    ayranValue: "بارد",
  },
  team: {
    badge: "قصتنا",
    title: "من شواية الفحم",
    p1: "يجلب مطبخ كابول ستريت نكهات المطبخ الأفغاني مباشرة إليك – تمامًا كما تُعرف وتُحب في مطاعم وأسواق كابول.",
    p2: "في القلب توجد شواية الفحم: فوق الجمر المتوهّج تنشأ أسياخ كباب متبّلة وقطع لحم طرية ودجاج غضّ – محضّرة طازجة وبكل حب، مع كابلي بلو التقليدي وكراهي وفطائر العجين المنزلية.",
    craftLabel: "حِرفتنا",
    craftValue: "نار فحم حقيقية",
    standardLabel: "معاييرنا",
    standardValue: "طازج وأصيل",
    grillLabel: "على الشواية",
    grillValue: "تقاليد أفغانية، طازجة فوق الجمر.",
  },
  contact: {
    badge: "زورونا",
    title: "اتصل بنا",
    intro: "اطلب للاستلام، أو اطلب توصيل طعامك، أو اتصل بنا ببساطة.",
    call: "اتصل بنا",
    brandTagline: "من شواية الفحم مباشرة إلى مدينتك.",
    cardTagline: "مطبخ كابول ستريت الأفغاني الأصيل.",
    socialMedia: "وسائل التواصل",
    labelPhone: "الهاتف",
    labelAddress: "العنوان",
    labelEmail: "البريد الإلكتروني",
    labelDelivery: "وقت التوصيل",
  },
  error: {
    title: "حدث خطأ ما",
    body: "يرجى إعادة تحميل الصفحة للمحاولة مرة أخرى.",
  },
};

const prs: TranslationSchema = {
  nav: {
    start: "خانه",
    menu: "منوی غذا",
    drinks: "نوشیدنی‌ها",
    story: "داستان ما",
    contact: "تماس",
    logoSubtitle: "از منقل ذغالی",
    homeAria: "صفحهٔ اصلی کابل استریت کیچن",
    toggleAria: "باز و بسته کردن منو",
    language: "زبان",
  },
  hours: { today: "امروز", openToday: "باز", closed: "بسته" },
  hero: {
    badgeCharcoal: "منقل ذغالی",
    badgeKitchen: "کابل استریت کیچن افغانی",
    subtitle: "کابل استریت کیچن اصیل افغانی – از منقل ذغالی.",
    support:
      "تازه و با عشق آماده شده: سیخ‌های کباب معطر، کابلی پلو، کراهی و دونر – طعم‌های کابل مستقیم از منقل به بشقاب شما.",
    cta: "دیدن منو",
    directions: "نمایش مسیر",
  },
  eat: {
    badge: "آشپزخانه · منقل ذغالی",
    title: "منوی غذا",
    intro:
      "از منقل ذغالی، تازه و با عشق آماده شده: سیخ‌های کباب، کابلی پلو، کراهی، دونر و پیتزای خیابانی – طعم‌های اصیل کابل.",
    categoryFallback: "خانگی و تازه آماده شده.",
    prep: "طرز تهیه",
    prepValue: "از منقل ذغالی",
    service: "خدمات",
    serviceValue: "تحویل‌گیری و رسانش",
    forKids: "برای کوچک‌ها",
    kidsMenu: "منوی کودکان",
  },
  drink: {
    house: "نوشیدنی‌های ویژه",
    houseHeading: "چای داغ با هل، دوغ تازه و آیران.",
    badge: "بار",
    title: "نوشیدنی‌ها",
    intro:
      "تازه و سنتی – چای افغانی، نوشیدنی‌های ماستی و کلاسیک‌های خنک برای هر غذا.",
    chaiValue: "معطر",
    dooghValue: "تازه",
    ayranValue: "خنک",
  },
  team: {
    badge: "داستان ما",
    title: "از منقل ذغالی",
    p1: "کابل استریت کیچن طعم‌های آشپزی افغانی را مستقیم به شما می‌آورد – همان‌گونه که در غذاخوری‌ها و بازارهای کابل شناخته و دوست داشته می‌شود.",
    p2: "در مرکز آن منقل ذغالی قرار دارد: روی ذغال‌های گداخته سیخ‌های کباب معطر، فیله‌های نرم و مرغ آبدار آماده می‌شود – تازه و با عشق، همراه با کابلی پلو سنتی، کراهی و خمیرهای خانگی.",
    craftLabel: "هنر ما",
    craftValue: "آتش واقعی ذغال",
    standardLabel: "معیار ما",
    standardValue: "تازه و اصیل",
    grillLabel: "کنار منقل",
    grillValue: "سنت افغانی، تازه روی ذغال.",
  },
  contact: {
    badge: "به دیدن ما بیایید",
    title: "تماس",
    intro: "برای تحویل‌گیری سفارش دهید، غذا را تحویل بگیرید یا به سادگی با ما تماس بگیرید.",
    call: "تماس",
    brandTagline: "از منقل ذغالی مستقیم به شهر شما.",
    cardTagline: "کابل استریت کیچن اصیل افغانی.",
    socialMedia: "شبکه‌های اجتماعی",
    labelPhone: "تلفن",
    labelAddress: "آدرس",
    labelEmail: "ایمیل",
    labelDelivery: "زمان تحویل",
  },
  error: {
    title: "مشکلی پیش آمد",
    body: "لطفاً برای تلاش دوباره صفحه را دوباره بارگذاری کنید.",
  },
};

const zh: TranslationSchema = {
  nav: {
    start: "首页",
    menu: "菜单",
    drinks: "饮品",
    story: "我们的故事",
    contact: "联系我们",
    logoSubtitle: "炭火烤制",
    homeAria: "喀布尔街头厨房首页",
    toggleAria: "切换导航",
    language: "语言",
  },
  hours: { today: "今天", openToday: "营业中", closed: "休息" },
  hero: {
    badgeCharcoal: "炭火烤架",
    badgeKitchen: "阿富汗喀布尔街头厨房",
    subtitle: "正宗阿富汗喀布尔街头厨房 — 炭火烤制。",
    support:
      "用心新鲜烹制：香辣烤肉串、Kabuli Palaw、Karahi 和 Döner — 把喀布尔的风味从烤架直接送到您的餐盘。",
    cta: "查看菜单",
    directions: "查看路线",
  },
  eat: {
    badge: "厨房 · 炭火烤架",
    title: "菜单",
    intro:
      "炭火烤制，用心新鲜烹制：烤肉串、Kabuli Palaw、Karahi、Döner 和街头披萨 — 来自喀布尔的正宗风味。",
    categoryFallback: "自制，新鲜烹饪。",
    prep: "烹制",
    prepValue: "炭火烤制",
    service: "服务",
    serviceValue: "自取和外送",
    forKids: "为孩子们",
    kidsMenu: "儿童套餐",
  },
  drink: {
    house: "招牌饮品",
    houseHeading: "加入豆蔻的热茶、新鲜 Doogh 和 Ayran。",
    badge: "酒吧",
    title: "饮品",
    intro: "清爽而传统 — 阿富汗茶、酸奶饮品和清凉经典，搭配每道菜肴。",
    chaiValue: "香浓",
    dooghValue: "新鲜",
    ayranValue: "清凉",
  },
  team: {
    badge: "我们的故事",
    title: "炭火烤制",
    p1: "喀布尔街头厨房将阿富汗美食的风味直接带给您 — 正如人们在喀布尔的街边小吃摊和集市上熟知并喜爱的那样。",
    p2: "核心是炭火烤架：在炽热的炭火上烤制香辣肉串、嫩煎肉排和多汁鸡肉 — 用心新鲜烹制，并搭配传统的 Kabuli Palaw、Karahi 和自制饺子。",
    craftLabel: "我们的手艺",
    craftValue: "真正的炭火",
    standardLabel: "我们的追求",
    standardValue: "新鲜且正宗",
    grillLabel: "在烤架旁",
    grillValue: "阿富汗传统，炭火上新鲜烤制。",
  },
  contact: {
    badge: "来访我们",
    title: "联系我们",
    intro: "下单自取、点餐外送，或直接打电话给我们。",
    call: "致电",
    brandTagline: "炭火烤制，直送您的城市。",
    cardTagline: "正宗阿富汗喀布尔街头厨房。",
    socialMedia: "社交媒体",
    labelPhone: "电话",
    labelAddress: "地址",
    labelEmail: "电子邮件",
    labelDelivery: "配送时间",
  },
  error: {
    title: "出错了",
    body: "请重新加载页面再试一次。",
  },
};

const ja: TranslationSchema = {
  nav: {
    start: "ホーム",
    menu: "メニュー",
    drinks: "ドリンク",
    story: "私たちの物語",
    contact: "お問い合わせ",
    logoSubtitle: "炭火焼き",
    homeAria: "カブール・ストリート・キッチン ホーム",
    toggleAria: "ナビゲーションの切り替え",
    language: "言語",
  },
  hours: { today: "本日", openToday: "営業中", closed: "定休日" },
  hero: {
    badgeCharcoal: "炭火グリル",
    badgeKitchen: "アフガニスタンのカブール・ストリート・キッチン",
    subtitle: "本格アフガニスタン カブール・ストリート・キッチン — 炭火焼き。",
    support:
      "心を込めて新鮮に調理：スパイシーなケバブ串、カブリ・パラウ、カラヒ、ドネル — カブールの味わいをグリルから直接お皿へ。",
    cta: "メニューを見る",
    directions: "ルートを見る",
  },
  eat: {
    badge: "キッチン · 炭火グリル",
    title: "メニュー",
    intro:
      "炭火で、心を込めて新鮮に調理：ケバブ串、カブリ・パラウ、カラヒ、ドネル、ストリートピザ — カブールの本格的な味わい。",
    categoryFallback: "自家製、できたて。",
    prep: "調理法",
    prepValue: "炭火焼き",
    service: "サービス",
    serviceValue: "テイクアウト＆デリバリー",
    forKids: "お子様向け",
    kidsMenu: "キッズメニュー",
  },
  drink: {
    house: "自家製ドリンク",
    houseHeading: "カルダモン入りのホットチャイ、新鮮なドゥーグとアイラン。",
    badge: "バー",
    title: "ドリンク",
    intro:
      "爽やかで伝統的 — アフガニスタンのお茶、ヨーグルトドリンク、どんな料理にも合う冷たい定番。",
    chaiValue: "スパイシー",
    dooghValue: "フレッシュ",
    ayranValue: "クール",
  },
  team: {
    badge: "私たちの物語",
    title: "炭火焼き",
    p1: "カブール・ストリート・キッチンは、アフガニスタン料理の味わいをそのままお届けします — カブールの食堂やバザールで親しまれ愛されてきた、あの味を。",
    p2: "中心にあるのは炭火グリル。燃える炭の上で、スパイシーなケバブ串、柔らかいカツレツ、ジューシーなチキンを焼き上げます — 心を込めて新鮮に、伝統的なカブリ・パラウ、カラヒ、自家製の包み料理とともに。",
    craftLabel: "私たちの技",
    craftValue: "本物の炭火",
    standardLabel: "私たちのこだわり",
    standardValue: "新鮮で本格的",
    grillLabel: "グリルの前で",
    grillValue: "アフガニスタンの伝統を、炭火で新鮮に。",
  },
  contact: {
    badge: "ご来店ください",
    title: "お問い合わせ",
    intro: "テイクアウトのご注文、デリバリー、またはお気軽にお電話ください。",
    call: "電話する",
    brandTagline: "炭火焼きをあなたの街へ直接。",
    cardTagline: "本格アフガニスタン カブール・ストリート・キッチン。",
    socialMedia: "ソーシャルメディア",
    labelPhone: "電話",
    labelAddress: "住所",
    labelEmail: "メール",
    labelDelivery: "配達時間",
  },
  error: {
    title: "問題が発生しました",
    body: "ページを再読み込みしてもう一度お試しください。",
  },
};

const hi: TranslationSchema = {
  nav: {
    start: "होम",
    menu: "मेन्यू",
    drinks: "पेय",
    story: "हमारी कहानी",
    contact: "संपर्क",
    logoSubtitle: "कोयले की ग्रिल से",
    homeAria: "काबुल स्ट्रीट किचन होम",
    toggleAria: "नेविगेशन टॉगल करें",
    language: "भाषा",
  },
  hours: { today: "आज", openToday: "खुला है", closed: "बंद" },
  hero: {
    badgeCharcoal: "कोयला ग्रिल",
    badgeKitchen: "अफ़ग़ान काबुल स्ट्रीट किचन",
    subtitle: "प्रामाणिक अफ़ग़ान काबुल स्ट्रीट किचन – कोयले की ग्रिल से।",
    support:
      "ताज़ा और दिल से बनाया गया: मसालेदार कबाब सीख, काबुली पुलाव, कराही और डोनर – काबुल के स्वाद सीधे ग्रिल से आपकी थाली तक।",
    cta: "मेन्यू देखें",
    directions: "रास्ता देखें",
  },
  eat: {
    badge: "रसोई · कोयला ग्रिल",
    title: "मेन्यू",
    intro:
      "कोयले की ग्रिल से, ताज़ा और दिल से बनाया गया: कबाब सीख, काबुली पुलाव, कराही, डोनर और स्ट्रीट पिज़्ज़ा – काबुल के प्रामाणिक स्वाद।",
    categoryFallback: "घर का बना और ताज़ा तैयार।",
    prep: "तैयारी",
    prepValue: "कोयले की ग्रिल से",
    service: "सेवा",
    serviceValue: "पिकअप और डिलीवरी",
    forKids: "बच्चों के लिए",
    kidsMenu: "किड्स मेन्यू",
  },
  drink: {
    house: "घर के पेय",
    houseHeading: "इलायची वाली गरम चाय, ताज़ा दूग़ और आयरन।",
    badge: "बार",
    title: "पेय",
    intro:
      "ताज़गी भरे और पारंपरिक – अफ़ग़ान चाय, दही के पेय और हर व्यंजन के साथ ठंडे क्लासिक।",
    chaiValue: "मसालेदार",
    dooghValue: "ताज़ा",
    ayranValue: "ठंडा",
  },
  team: {
    badge: "हमारी कहानी",
    title: "कोयले की ग्रिल से",
    p1: "काबुल स्ट्रीट किचन अफ़ग़ान व्यंजनों के स्वाद सीधे आप तक लाता है – ठीक वैसे ही जैसे काबुल के खाने के ठेलों और बाज़ारों में इन्हें जाना और पसंद किया जाता है।",
    p2: "केंद्र में है कोयले की ग्रिल: दहकते कोयलों पर बनते हैं मसालेदार कबाब सीख, नरम चॉप और रसीला चिकन – ताज़ा और दिल से बनाया गया, साथ में पारंपरिक काबुली पुलाव, कराही और घर के बने पकौड़े-समोसे।",
    craftLabel: "हमारा हुनर",
    craftValue: "असली कोयले की आग",
    standardLabel: "हमारा मानक",
    standardValue: "ताज़ा और प्रामाणिक",
    grillLabel: "ग्रिल पर",
    grillValue: "अफ़ग़ान परंपरा, कोयले पर ताज़ा।",
  },
  contact: {
    badge: "हमसे मिलें",
    title: "संपर्क",
    intro: "पिकअप के लिए ऑर्डर करें, खाना डिलीवर करवाएँ या बस हमें कॉल करें।",
    call: "कॉल करें",
    brandTagline: "कोयले की ग्रिल से सीधे आपके शहर तक।",
    cardTagline: "प्रामाणिक अफ़ग़ान काबुल स्ट्रीट किचन।",
    socialMedia: "सोशल मीडिया",
    labelPhone: "फ़ोन",
    labelAddress: "पता",
    labelEmail: "ईमेल",
    labelDelivery: "डिलीवरी समय",
  },
  error: {
    title: "कुछ गड़बड़ हो गई",
    body: "कृपया पुनः प्रयास करने के लिए पेज को फिर से लोड करें।",
  },
};

const nl: TranslationSchema = {
  nav: {
    start: "Home",
    menu: "Menukaart",
    drinks: "Dranken",
    story: "Ons verhaal",
    contact: "Contact",
    logoSubtitle: "Van de houtskoolgrill",
    homeAria: "Kabul Street Kitchen startpagina",
    toggleAria: "Navigatie wisselen",
    language: "Taal",
  },
  hours: { today: "Vandaag", openToday: "Open", closed: "Gesloten" },
  hero: {
    badgeCharcoal: "Houtskoolgrill",
    badgeKitchen: "Afghaanse Kabul Street Kitchen",
    subtitle: "Authentieke Afghaanse Kabul Street Kitchen – van de houtskoolgrill.",
    support:
      "Vers en met liefde bereid: pittige kebabspiesen, Kabuli Palaw, Karahi en Döner – de smaken van Kaboel rechtstreeks van de grill op je bord.",
    cta: "Bekijk de menukaart",
    directions: "Route bekijken",
  },
  eat: {
    badge: "Keuken · Houtskoolgrill",
    title: "Menukaart",
    intro:
      "Van de houtskoolgrill, vers en met liefde bereid: kebabspiesen, Kabuli Palaw, Karahi, Döner en Street Pizza – authentieke smaken uit Kaboel.",
    categoryFallback: "Huisgemaakt en vers bereid.",
    prep: "Bereiding",
    prepValue: "Van de houtskoolgrill",
    service: "Service",
    serviceValue: "Afhalen & bezorgen",
    forKids: "Voor de kleintjes",
    kidsMenu: "Kindermenu",
  },
  drink: {
    house: "Huisdranken",
    houseHeading: "Hete chai met kardemom, verse Doogh en Ayran.",
    badge: "Bar",
    title: "Dranken",
    intro:
      "Verfrissend en traditioneel – Afghaanse thee, yoghurtdranken en koele klassiekers bij elk gerecht.",
    chaiValue: "Kruidig",
    dooghValue: "Vers",
    ayranValue: "Koel",
  },
  team: {
    badge: "Ons verhaal",
    title: "Van de houtskoolgrill",
    p1: "Kabul Street Kitchen brengt de smaken van de Afghaanse keuken rechtstreeks naar jou – zoals men ze kent en liefheeft bij de eetstalletjes en bazaars van Kaboel.",
    p2: "Centraal staat de houtskoolgrill: boven gloeiende kolen ontstaan pittige kebabspiesen, malse koteletten en sappige kip – vers en met liefde bereid, aangevuld met traditionele Kabuli Palaw, Karahi en huisgemaakte deeghapjes.",
    craftLabel: "Ons vakmanschap",
    craftValue: "Echt houtskoolvuur",
    standardLabel: "Onze ambitie",
    standardValue: "Vers & authentiek",
    grillLabel: "Aan de grill",
    grillValue: "Afghaanse traditie, vers boven de kolen.",
  },
  contact: {
    badge: "Bezoek ons",
    title: "Contact",
    intro: "Bestel om af te halen, laat je eten bezorgen of bel ons gewoon.",
    call: "Bel ons",
    brandTagline: "Van de houtskoolgrill rechtstreeks naar jouw stad.",
    cardTagline: "Authentieke Afghaanse Kabul Street Kitchen.",
    socialMedia: "Social media",
    labelPhone: "Telefoon",
    labelAddress: "Adres",
    labelEmail: "E-mail",
    labelDelivery: "Bezorgtijd",
  },
  error: {
    title: "Er is iets misgegaan",
    body: "Laad de pagina opnieuw om het nog eens te proberen.",
  },
};

const fr: TranslationSchema = {
  nav: {
    start: "Accueil",
    menu: "Carte",
    drinks: "Boissons",
    story: "Notre histoire",
    contact: "Contact",
    logoSubtitle: "Du gril au charbon de bois",
    homeAria: "Accueil Kabul Street Kitchen",
    toggleAria: "Basculer la navigation",
    language: "Langue",
  },
  hours: { today: "Aujourd'hui", openToday: "Ouvert", closed: "Fermé" },
  hero: {
    badgeCharcoal: "Gril au charbon",
    badgeKitchen: "Kabul Street Kitchen afghane",
    subtitle: "Authentique Kabul Street Kitchen afghane – au gril au charbon de bois.",
    support:
      "Préparé frais et avec cœur : brochettes de kebab épicées, Kabuli Palaw, Karahi et Döner – les saveurs de Kaboul, du gril directement dans votre assiette.",
    cta: "Voir la carte",
    directions: "Voir l'itinéraire",
  },
  eat: {
    badge: "Cuisine · Gril au charbon",
    title: "Carte",
    intro:
      "Au gril au charbon, préparé frais et avec cœur : brochettes de kebab, Kabuli Palaw, Karahi, Döner et Street Pizza – des saveurs authentiques de Kaboul.",
    categoryFallback: "Fait maison et préparé frais.",
    prep: "Préparation",
    prepValue: "Au gril au charbon",
    service: "Service",
    serviceValue: "À emporter & livraison",
    forKids: "Pour les petits",
    kidsMenu: "Menu enfant",
  },
  drink: {
    house: "Boissons maison",
    houseHeading: "Chai chaud à la cardamome, Doogh frais et Ayran.",
    badge: "Bar",
    title: "Boissons",
    intro:
      "Rafraîchissant et traditionnel – thé afghan, boissons au yaourt et classiques frais pour chaque plat.",
    chaiValue: "Épicé",
    dooghValue: "Frais",
    ayranValue: "Bien frais",
  },
  team: {
    badge: "Notre histoire",
    title: "Du gril au charbon",
    p1: "Kabul Street Kitchen vous apporte les saveurs de la cuisine afghane directement – telles qu'on les connaît et qu'on les aime dans les gargotes et les bazars de Kaboul.",
    p2: "Au cœur de tout, le gril au charbon : sur les braises rougeoyantes naissent des brochettes de kebab épicées, des côtelettes tendres et du poulet juteux – préparés frais et avec cœur, accompagnés du traditionnel Kabuli Palaw, du Karahi et de raviolis faits maison.",
    craftLabel: "Notre savoir-faire",
    craftValue: "Vrai feu de charbon",
    standardLabel: "Notre exigence",
    standardValue: "Frais & authentique",
    grillLabel: "Au gril",
    grillValue: "La tradition afghane, fraîche sur les braises.",
  },
  contact: {
    badge: "Rendez-nous visite",
    title: "Contact",
    intro: "Commandez à emporter, faites-vous livrer ou appelez-nous simplement.",
    call: "Appeler",
    brandTagline: "Du gril au charbon directement dans votre ville.",
    cardTagline: "Authentique Kabul Street Kitchen afghane.",
    socialMedia: "Réseaux sociaux",
    labelPhone: "Téléphone",
    labelAddress: "Adresse",
    labelEmail: "E-mail",
    labelDelivery: "Délai de livraison",
  },
  error: {
    title: "Une erreur s'est produite",
    body: "Veuillez recharger la page pour réessayer.",
  },
};

const it: TranslationSchema = {
  nav: {
    start: "Home",
    menu: "Menù",
    drinks: "Bevande",
    story: "La nostra storia",
    contact: "Contatti",
    logoSubtitle: "Dalla griglia a carbone",
    homeAria: "Home di Kabul Street Kitchen",
    toggleAria: "Attiva/disattiva navigazione",
    language: "Lingua",
  },
  hours: { today: "Oggi", openToday: "Aperto", closed: "Chiuso" },
  hero: {
    badgeCharcoal: "Griglia a carbone",
    badgeKitchen: "Kabul Street Kitchen afghana",
    subtitle: "Autentica Kabul Street Kitchen afghana – dalla griglia a carbone.",
    support:
      "Preparato fresco e con cuore: spiedini di kebab speziati, Kabuli Palaw, Karahi e Döner – i sapori di Kabul dalla griglia direttamente nel tuo piatto.",
    cta: "Vedi il menù",
    directions: "Mostra indicazioni",
  },
  eat: {
    badge: "Cucina · Griglia a carbone",
    title: "Menù",
    intro:
      "Dalla griglia a carbone, preparato fresco e con cuore: spiedini di kebab, Kabuli Palaw, Karahi, Döner e Street Pizza – sapori autentici di Kabul.",
    categoryFallback: "Fatto in casa e preparato fresco.",
    prep: "Preparazione",
    prepValue: "Dalla griglia a carbone",
    service: "Servizio",
    serviceValue: "Asporto e consegna",
    forKids: "Per i più piccoli",
    kidsMenu: "Menù bambini",
  },
  drink: {
    house: "Bevande della casa",
    houseHeading: "Chai caldo al cardamomo, Doogh fresco e Ayran.",
    badge: "Bar",
    title: "Bevande",
    intro:
      "Rinfrescanti e tradizionali – tè afghano, bevande allo yogurt e classici freschi per ogni piatto.",
    chaiValue: "Speziato",
    dooghValue: "Fresco",
    ayranValue: "Freddo",
  },
  team: {
    badge: "La nostra storia",
    title: "Dalla griglia a carbone",
    p1: "Kabul Street Kitchen porta i sapori della cucina afghana direttamente da te – proprio come si conoscono e si amano nelle bancarelle e nei bazar di Kabul.",
    p2: "Al centro c'è la griglia a carbone: sulle braci ardenti nascono spiedini di kebab speziati, tenere costolette e pollo succoso – preparati freschi e con cuore, accompagnati dal tradizionale Kabuli Palaw, dal Karahi e dai ravioli fatti in casa.",
    craftLabel: "La nostra arte",
    craftValue: "Vero fuoco a carbone",
    standardLabel: "La nostra ambizione",
    standardValue: "Fresco e autentico",
    grillLabel: "Alla griglia",
    grillValue: "Tradizione afghana, fresca sulla brace.",
  },
  contact: {
    badge: "Vieni a trovarci",
    title: "Contatti",
    intro: "Ordina da asporto, fatti consegnare il cibo o chiamaci semplicemente.",
    call: "Chiama",
    brandTagline: "Dalla griglia a carbone direttamente nella tua città.",
    cardTagline: "Autentica Kabul Street Kitchen afghana.",
    socialMedia: "Social media",
    labelPhone: "Telefono",
    labelAddress: "Indirizzo",
    labelEmail: "E-mail",
    labelDelivery: "Tempo di consegna",
  },
  error: {
    title: "Qualcosa è andato storto",
    body: "Ricarica la pagina per riprovare.",
  },
};

const es: TranslationSchema = {
  nav: {
    start: "Inicio",
    menu: "Carta",
    drinks: "Bebidas",
    story: "Nuestra historia",
    contact: "Contacto",
    logoSubtitle: "De la parrilla de carbón",
    homeAria: "Inicio de Kabul Street Kitchen",
    toggleAria: "Alternar navegación",
    language: "Idioma",
  },
  hours: { today: "Hoy", openToday: "Abierto", closed: "Cerrado" },
  hero: {
    badgeCharcoal: "Parrilla de carbón",
    badgeKitchen: "Kabul Street Kitchen afgana",
    subtitle: "Auténtica Kabul Street Kitchen afgana – de la parrilla de carbón.",
    support:
      "Preparado fresco y con cariño: brochetas de kebab especiadas, Kabuli Palaw, Karahi y Döner – los sabores de Kabul de la parrilla directamente a tu plato.",
    cta: "Ver la carta",
    directions: "Ver cómo llegar",
  },
  eat: {
    badge: "Cocina · Parrilla de carbón",
    title: "Carta",
    intro:
      "De la parrilla de carbón, preparado fresco y con cariño: brochetas de kebab, Kabuli Palaw, Karahi, Döner y Street Pizza – sabores auténticos de Kabul.",
    categoryFallback: "Casero y recién preparado.",
    prep: "Preparación",
    prepValue: "De la parrilla de carbón",
    service: "Servicio",
    serviceValue: "Recogida y entrega",
    forKids: "Para los más pequeños",
    kidsMenu: "Menú infantil",
  },
  drink: {
    house: "Bebidas de la casa",
    houseHeading: "Chai caliente con cardamomo, Doogh fresco y Ayran.",
    badge: "Bar",
    title: "Bebidas",
    intro:
      "Refrescantes y tradicionales – té afgano, bebidas de yogur y clásicos fríos para cada plato.",
    chaiValue: "Especiado",
    dooghValue: "Fresco",
    ayranValue: "Frío",
  },
  team: {
    badge: "Nuestra historia",
    title: "De la parrilla de carbón",
    p1: "Kabul Street Kitchen trae los sabores de la cocina afgana directamente a ti – tal como se conocen y se aman en los puestos de comida y bazares de Kabul.",
    p2: "En el centro está la parrilla de carbón: sobre las brasas ardientes nacen brochetas de kebab especiadas, tiernas chuletas y jugoso pollo – preparados frescos y con cariño, acompañados del tradicional Kabuli Palaw, Karahi y empanadillas caseras.",
    craftLabel: "Nuestro oficio",
    craftValue: "Auténtico fuego de carbón",
    standardLabel: "Nuestra exigencia",
    standardValue: "Fresco y auténtico",
    grillLabel: "En la parrilla",
    grillValue: "Tradición afgana, fresca sobre las brasas.",
  },
  contact: {
    badge: "Visítanos",
    title: "Contacto",
    intro: "Pide para recoger, haz que te traigan la comida o simplemente llámanos.",
    call: "Llamar",
    brandTagline: "De la parrilla de carbón directamente a tu ciudad.",
    cardTagline: "Auténtica Kabul Street Kitchen afgana.",
    socialMedia: "Redes sociales",
    labelPhone: "Teléfono",
    labelAddress: "Dirección",
    labelEmail: "Correo electrónico",
    labelDelivery: "Tiempo de entrega",
  },
  error: {
    title: "Algo salió mal",
    body: "Vuelve a cargar la página para intentarlo de nuevo.",
  },
};

const el: TranslationSchema = {
  nav: {
    start: "Αρχική",
    menu: "Μενού",
    drinks: "Ποτά",
    story: "Η ιστορία μας",
    contact: "Επικοινωνία",
    logoSubtitle: "Από τη σχάρα κάρβουνου",
    homeAria: "Αρχική σελίδα Kabul Street Kitchen",
    toggleAria: "Εναλλαγή πλοήγησης",
    language: "Γλώσσα",
  },
  hours: { today: "Σήμερα", openToday: "Ανοιχτά", closed: "Κλειστά" },
  hero: {
    badgeCharcoal: "Σχάρα κάρβουνου",
    badgeKitchen: "Αφγανικό Kabul Street Kitchen",
    subtitle: "Αυθεντικό αφγανικό Kabul Street Kitchen – από τη σχάρα κάρβουνου.",
    support:
      "Φτιαγμένο φρέσκο και με μεράκι: πικάντικα σουβλάκια κεμπάπ, Kabuli Palaw, Karahi και Döner – οι γεύσεις της Καμπούλ από τη σχάρα κατευθείαν στο πιάτο σας.",
    cta: "Δείτε το μενού",
    directions: "Οδηγίες διαδρομής",
  },
  eat: {
    badge: "Κουζίνα · Σχάρα κάρβουνου",
    title: "Μενού",
    intro:
      "Από τη σχάρα κάρβουνου, φτιαγμένο φρέσκο και με μεράκι: σουβλάκια κεμπάπ, Kabuli Palaw, Karahi, Döner και Street Pizza – αυθεντικές γεύσεις από την Καμπούλ.",
    categoryFallback: "Σπιτικό και φρεσκοφτιαγμένο.",
    prep: "Παρασκευή",
    prepValue: "Από τη σχάρα κάρβουνου",
    service: "Εξυπηρέτηση",
    serviceValue: "Παραλαβή & διανομή",
    forKids: "Για τους μικρούς",
    kidsMenu: "Παιδικό μενού",
  },
  drink: {
    house: "Ποτά του καταστήματος",
    houseHeading: "Ζεστό chai με κάρδαμο, φρέσκο Doogh και Ayran.",
    badge: "Μπαρ",
    title: "Ποτά",
    intro:
      "Δροσιστικά και παραδοσιακά – αφγανικό τσάι, ροφήματα γιαουρτιού και δροσερά κλασικά για κάθε πιάτο.",
    chaiValue: "Πικάντικο",
    dooghValue: "Φρέσκο",
    ayranValue: "Δροσερό",
  },
  team: {
    badge: "Η ιστορία μας",
    title: "Από τη σχάρα κάρβουνου",
    p1: "Το Kabul Street Kitchen φέρνει τις γεύσεις της αφγανικής κουζίνας κατευθείαν σε εσάς – όπως τις γνωρίζουν και τις αγαπούν στα στέκια φαγητού και τα παζάρια της Καμπούλ.",
    p2: "Στο επίκεντρο βρίσκεται η σχάρα κάρβουνου: πάνω από τα πυρωμένα κάρβουνα γεννιούνται πικάντικα σουβλάκια κεμπάπ, τρυφερά παϊδάκια και ζουμερό κοτόπουλο – φτιαγμένα φρέσκα και με μεράκι, συνοδευόμενα από παραδοσιακό Kabuli Palaw, Karahi και σπιτικά ζυμαρικά.",
    craftLabel: "Η τέχνη μας",
    craftValue: "Αληθινή φωτιά κάρβουνου",
    standardLabel: "Η φιλοδοξία μας",
    standardValue: "Φρέσκο & αυθεντικό",
    grillLabel: "Στη σχάρα",
    grillValue: "Αφγανική παράδοση, φρέσκια στα κάρβουνα.",
  },
  contact: {
    badge: "Επισκεφθείτε μας",
    title: "Επικοινωνία",
    intro: "Παραγγείλετε για παραλαβή, ζητήστε διανομή ή απλώς τηλεφωνήστε μας.",
    call: "Κλήση",
    brandTagline: "Από τη σχάρα κάρβουνου κατευθείαν στην πόλη σας.",
    cardTagline: "Αυθεντικό αφγανικό Kabul Street Kitchen.",
    socialMedia: "Μέσα κοινωνικής δικτύωσης",
    labelPhone: "Τηλέφωνο",
    labelAddress: "Διεύθυνση",
    labelEmail: "Email",
    labelDelivery: "Χρόνος παράδοσης",
  },
  error: {
    title: "Κάτι πήγε στραβά",
    body: "Παρακαλώ φορτώστε ξανά τη σελίδα για να δοκιμάσετε πάλι.",
  },
};

export const translations: Record<LanguageCode, TranslationSchema> = {
  de,
  en,
  ar,
  prs,
  zh,
  ja,
  hi,
  nl,
  fr,
  it,
  es,
  el,
};
