import { CupSoda, GlassWater, Sparkles, Coffee } from "lucide-react";
import chaiDooghAyranImage from "@/assets/chai-doogh-ayran.jpg";
import kabulLogo from "@/assets/kabul-logo.jpg";
import { useDrinkCategories } from "@/hooks/useRestaurantData";
import { useTranslation } from "@/i18n/LanguageContext";
import DataSourceNotice from "@/components/DataSourceNotice";

const DrinkSection = () => {
  const { data: drinkCategories, errorMessage } = useDrinkCategories();
  const { t } = useTranslation();

  return (
    <section id="drink" className="section-band section-band-drink relative isolate overflow-hidden">
      <div className="absolute inset-0 depth-pattern opacity-40" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <DataSourceNotice errorMessage={errorMessage} resource="drinks" className="mb-8" />
        <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div className="order-2 depth-stage lg:order-1">
            <div className="feature-plate relative min-h-[560px] overflow-hidden rounded-xl border border-white/12 shadow-[0_40px_120px_hsl(var(--comorin-teal-dark)/0.5)]">
              <img
                src={chaiDooghAyranImage}
                alt="Chai, Doogh und Ayran bei Kabul Street Kitchen"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--comorin-teal-dark)/0.3)_0%,hsl(var(--comorin-teal-dark)/0.82)_100%)]" />
              <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-comorin-teal-dark/40 p-3 backdrop-blur-md">
                <img src={kabulLogo} alt="Kabul Street Kitchen Logo" loading="lazy" decoding="async" className="h-24 w-24 rounded-full object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="max-w-md">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light">{t.drink.house}</p>
                  <h3 className="mt-3 text-4xl font-semibold leading-tight text-white">{t.drink.houseHeading}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 text-white lg:order-2">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light backdrop-blur-md">
              <CupSoda className="h-4 w-4" />
              {t.drink.badge}
            </div>
            <h2 className="font-heading text-[clamp(3.5rem,9vw,8rem)] font-semibold uppercase leading-none tracking-tight">
              {t.drink.title}
            </h2>
            <p className="mt-6 max-w-xl text-xl leading-8 text-white/76">
              {t.drink.intro}
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                <Coffee className="h-6 w-6 text-comorin-teal-light" />
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/52">Chai</p>
                <p className="mt-1 text-2xl font-semibold">{t.drink.chaiValue}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                <Sparkles className="h-6 w-6 text-comorin-teal-light" />
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/52">Doogh</p>
                <p className="mt-1 text-2xl font-semibold">{t.drink.dooghValue}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                <GlassWater className="h-6 w-6 text-comorin-teal-light" />
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/52">Ayran</p>
                <p className="mt-1 text-2xl font-semibold">{t.drink.ayranValue}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5">
          {drinkCategories.map((category) => (
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
                <h3 className="absolute bottom-4 left-4 right-4 text-2xl font-semibold text-white">
                  {category.name}
                </h3>
              </div>

              <div className="grid gap-x-8 gap-y-3 p-5 sm:grid-cols-2">
                {category.drink_items.map((item) => (
                  <div key={item.id} className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                    <div>
                      <p className="text-sm leading-5 text-white/86">{item.name}</p>
                      {item.description && (
                        <p className="mt-1 text-xs leading-5 text-white/50">{item.description}</p>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-comorin-teal-light">{item.price.toFixed(2)} €</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DrinkSection;
