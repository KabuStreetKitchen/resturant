import { useMemo } from "react";
import { Flame, Star, Truck, Utensils } from "lucide-react";
import grillSpread from "@/assets/grill.jpg";
import kabulLogo from "@/assets/kabul-logo.jpg";
import { fallbackKabulPlatte } from "@/data/restaurantData";
import { useMenuCategories } from "@/hooks/useRestaurantData";
import { useTranslation } from "@/i18n/LanguageContext";
import DataSourceNotice from "@/components/DataSourceNotice";

const EatSection = () => {
  const { data: menuCategories, errorMessage } = useMenuCategories();
  const platte = fallbackKabulPlatte;
  const { t } = useTranslation();

  const featuredItems = useMemo(
    () =>
      menuCategories
        .flatMap((category) =>
          category.menu_items.slice(0, 1).map((item) => ({
            ...item,
            category: category.name,
          })),
        )
        .slice(0, 4),
    [menuCategories],
  );

  return (
    <section id="eat" className="section-band section-band-eat relative isolate overflow-hidden">
      <div className="absolute inset-0 depth-pattern opacity-50" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <DataSourceNotice errorMessage={errorMessage} resource="menu" className="mb-8" />
        <div className="grid items-end gap-10 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light backdrop-blur-md">
              <Flame className="h-4 w-4" />
              {t.eat.badge}
            </div>
            <h2 className="font-heading text-[clamp(3.5rem,9vw,8rem)] font-semibold uppercase leading-none tracking-tight text-white">
              {t.eat.title}
            </h2>
            <p className="mt-6 max-w-xl text-xl leading-8 text-white/76">
              {t.eat.intro}
            </p>
          </div>

          <div className="depth-stage">
            <div className="feature-plate relative min-h-[520px] overflow-hidden rounded-xl border border-white/12 shadow-[0_40px_120px_hsl(var(--comorin-teal-dark)/0.5)]">
              <img
                src={grillSpread}
                alt="Gemischte Kebabplatte vom Holzkohlegrill"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--comorin-teal-dark)/0.05)_0%,hsl(var(--comorin-teal-dark)/0.82)_100%)]" />
              <img
                src={kabulLogo}
                alt="Kabul Street Kitchen Logo"
                loading="lazy"
                decoding="async"
                className="absolute right-6 top-6 h-24 w-24 rounded-xl border border-white/24 object-cover shadow-[0_18px_45px_hsl(var(--comorin-teal-dark)/0.45)]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  {featuredItems.map((item) => (
                    <div key={`${item.category}-${item.id}`} className="rounded-lg border border-white/12 bg-comorin-teal-dark/45 p-4 text-white backdrop-blur-md">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-comorin-teal-light">{item.category}</p>
                        <p className="font-semibold">{item.price.toFixed(2)} €</p>
                      </div>
                      <p className="mt-2 text-lg font-semibold leading-tight">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {menuCategories.map((category) => (
            <article key={category.id} className="menu-category-card group">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={category.image_url ?? "/placeholder.svg"}
                  alt={category.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--comorin-teal-dark)/0)_0%,hsl(var(--comorin-teal-dark)/0.78)_100%)]" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
                  <Utensils className="h-5 w-5 shrink-0 text-comorin-teal-light" />
                </div>
              </div>

              <div className="space-y-4 p-5">
                <p className="min-h-12 text-sm leading-6 text-white/64">
                  {category.description ?? t.eat.categoryFallback}
                </p>
                <div className="space-y-3">
                  {category.menu_items.map((item) => (
                    <div key={item.id} className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium leading-5 text-white/90">{item.name}</p>
                        {item.description && (
                          <p className="mt-1 text-xs leading-5 text-white/50">{item.description}</p>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-comorin-teal-light">{item.price.toFixed(2)} €</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Kabul Platte – set menu highlight */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-comorin-teal/40 bg-comorin-teal-dark/55 p-8 text-white shadow-[0_40px_120px_hsl(var(--comorin-teal-dark)/0.55)] backdrop-blur-xl sm:p-12">
          <div className="text-center">
            <Star className="mx-auto h-5 w-5 text-comorin-teal-light" />
            <h3 className="mt-3 font-heading text-4xl font-semibold uppercase tracking-tight sm:text-5xl">{platte.title}</h3>
            <p className="mt-2 text-comorin-teal-light">{platte.subtitle}</p>
          </div>

          <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
            {platte.images.map((image) => (
              <div key={image} className="overflow-hidden rounded-xl border border-white/12">
                <img src={image} alt={platte.title} loading="lazy" decoding="async" className="h-32 w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-2xl space-y-3">
            {platte.courses.map((course) => (
              <div key={course.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-white/10 pb-3">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-comorin-teal-light">{course.label}</p>
                <p className="text-sm text-white/82">{course.items}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {platte.options.map((option) => (
              <div key={option.persons} className="rounded-xl border border-white/12 bg-white/5 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-comorin-teal-light">{option.persons}</p>
                <p className="mt-2 text-3xl font-bold text-white">{option.price.toFixed(2)} €</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 border-y border-white/12 py-8 text-white md:grid-cols-3">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-comorin-teal text-white">
              <Flame className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-comorin-teal-light">{t.eat.prep}</p>
              <p className="mt-1 text-lg font-semibold">{t.eat.prepValue}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/12 text-comorin-teal-light">
              <Truck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-comorin-teal-light">{t.eat.service}</p>
              <p className="mt-1 text-lg font-semibold">{t.eat.serviceValue}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/12 text-comorin-teal-light">
              <Utensils className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-comorin-teal-light">{t.eat.forKids}</p>
              <p className="mt-1 text-lg font-semibold">{t.eat.kidsMenu} 7,00 €</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EatSection;
