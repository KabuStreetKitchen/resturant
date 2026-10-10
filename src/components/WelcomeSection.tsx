import { ArrowDown, Clock, Flame, MapPin, Utensils } from "lucide-react";
import grillBackdrop from "@/assets/grill.jpg";
import kabulLogo from "@/assets/kabul-logo.jpg";
import lieferandoLogo from "@/assets/lieferando-logo.png";
import uberEatsLogo from "@/assets/uber-eats-logo.svg";
import { dayOrder } from "@/data/restaurantData";
import { LIEFERANDO_URL, UBEREATS_URL } from "@/data/orderLinks";
import { useContactInfo, useOpeningHours } from "@/hooks/useRestaurantData";
import { directionsUrl } from "@/lib/utils";
import { useTranslation } from "@/i18n/LanguageContext";
import DataSourceNotice from "@/components/DataSourceNotice";

const WelcomeSection = () => {
  const { data: openingHours, errorMessage } = useOpeningHours();
  const { data: contactInfo } = useContactInfo();
  const { t, meta } = useTranslation();
  const address = contactInfo.find((info) => info.type === "address");

  const dayFormatter = new Intl.DateTimeFormat(meta.intlLocale, { weekday: "short" });
  // dayOrder is Monday-first and 2023-01-02 was a Monday, so index maps cleanly.
  const localizedDay = (dayOfWeek: string) => {
    const index = dayOrder.indexOf(dayOfWeek);
    if (index === -1) return dayOfWeek.slice(0, 2);
    return dayFormatter.format(new Date(2023, 0, 2 + index));
  };

  // Tuesday is the weekly Ruhetag. Enforced client-side until the live DB row
  // can be updated - apply supabase/migrations/20261010153000_tuesday_closed.sql
  // (or the UPDATE it contains), then delete this override.
  const hours = openingHours.map((hour) =>
    hour.day_of_week === "Tuesday"
      ? { ...hour, open_time: null, close_time: null, is_closed: true }
      : hour,
  );

  const sortedOpeningHours = [...hours]
    .sort((a, b) => dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week))
    .map((hour) => ({
      key: hour.day_of_week,
      day: localizedDay(hour.day_of_week),
      time:
        hour.is_closed || !hour.open_time || !hour.close_time
          ? t.hours.closed
          : `${hour.open_time.slice(0, 5)} - ${hour.close_time.slice(0, 5)}`,
      isClosed: Boolean(hour.is_closed || !hour.open_time || !hour.close_time),
    }));

  // English long names from Intl match dayOrder exactly, whatever the UI locale is.
  const todayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date());
  const todayHours = sortedOpeningHours.find((hour) => hour.key === todayName);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="welcome" className="luxury-hero relative isolate min-h-screen overflow-hidden bg-comorin-gradient">
      <img
        src={grillBackdrop}
        alt="Kabul Street Kitchen vom Holzkohlegrill"
        className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-comorin-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--comorin-teal-dark)/0.98)_0%,hsl(var(--comorin-teal-dark)/0.92)_42%,hsl(var(--comorin-teal-dark)/0.45)_72%,hsl(var(--comorin-teal-dark)/0.16)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--comorin-teal-dark)/0.42)_0%,hsl(var(--comorin-teal-dark)/0.16)_45%,hsl(var(--comorin-teal-dark)/0.72)_100%)]" />
      <div className="absolute inset-0 depth-pattern opacity-70" />

      <div className="hero-three-scene" aria-hidden="true">
        <video
          src="/frontpagevideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pt-28 sm:px-6 lg:px-8">
        <DataSourceNotice errorMessage={errorMessage} resource="opening-hours" className="mb-4" />
        <div className="grid flex-1 items-center gap-10 pb-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.7fr)]">
          <div className="hero-copy-contrast relative max-w-3xl text-white">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-comorin-teal-light">
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 backdrop-blur-md">
                <Flame className="h-4 w-4" />
                {t.hero.badgeCharcoal}
              </span>
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 backdrop-blur-md">
                <Utensils className="h-4 w-4" />
                {t.hero.badgeKitchen}
              </span>
            </div>

            <div className="mb-7 flex items-center gap-5">
              <img
                src={kabulLogo}
                alt="Kabul Street Kitchen Logo"
                className="h-28 w-28 shrink-0 rounded-2xl border border-white/15 object-cover shadow-[0_24px_70px_hsl(var(--comorin-teal-dark)/0.7)] sm:h-36 sm:w-36"
              />
              <h1 className="font-logo text-[clamp(2.6rem,7vw,5.5rem)] font-black uppercase leading-[0.86] tracking-[0.04em] text-white text-balance drop-shadow-[0_20px_70px_hsl(var(--comorin-teal-dark)/0.7)]">
                <span className="block">Kabul</span>
                <span className="block bg-gradient-to-r from-comorin-teal-light via-comorin-teal to-comorin-teal-light bg-clip-text text-transparent">
                  Street Kitchen
                </span>
              </h1>
            </div>

            <p className="hero-subtitle mt-4 max-w-2xl text-2xl font-light leading-tight tracking-wide sm:text-3xl lg:text-4xl">
              {t.hero.subtitle}
            </p>

            <p className="hero-support-copy mt-6 max-w-xl text-base font-normal leading-8 sm:text-lg">
              {t.hero.support}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => scrollToSection("#eat")}
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-comorin-teal px-7 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-elegant transition duration-300 hover:-translate-y-0.5 hover:bg-comorin-teal-light"
              >
                {t.hero.cta}
                <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
              </button>
              <a
                href={LIEFERANDO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              >
                <img src={lieferandoLogo} alt="Lieferando" className="h-7 w-auto" loading="lazy" decoding="async" />
              </a>
              <a
                href={UBEREATS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              >
                <img src={uberEatsLogo} alt="Uber Eats" className="h-6 w-auto" loading="lazy" decoding="async" />
              </a>
            </div>
          </div>

          <aside className="depth-stage w-full max-w-[360px] justify-self-center lg:justify-self-end">
            <div className="hero-hours-panel w-full rounded-lg border border-white/16 bg-comorin-teal-dark/35 p-5 text-white shadow-[0_32px_100px_hsl(var(--comorin-teal-dark)/0.5)] backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-comorin-teal-light">{t.hours.today}</p>
                  <h2 className={`mt-2 text-2xl font-semibold ${todayHours?.isClosed ? "text-comorin-teal-light" : ""}`}>
                    {todayHours?.isClosed ? t.hours.closed : t.hours.openToday}
                  </h2>
                </div>
                <div className="hidden items-center gap-3 sm:flex">
                  <a
                    href={address ? directionsUrl(address.value) : undefined}
                    aria-label={t.hero.directions}
                    title={t.hero.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-12 w-12 place-items-center rounded-full border border-[hsl(var(--comorin-teal-light)/0.45)] bg-[hsl(var(--comorin-teal)/0.25)] text-comorin-teal-light shadow-[0_10px_28px_hsl(var(--comorin-teal)/0.35)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-[hsl(var(--comorin-teal)/0.4)]"
                  >
                    <MapPin className="h-5 w-5" />
                  </a>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-white/12">
                    <Clock className="h-5 w-5 text-comorin-teal-light" />
                  </div>
                </div>
              </div>

              <div className="hidden space-y-2 sm:block">
                {sortedOpeningHours.map((item) => (
                  <div
                    key={item.key}
                    className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm ${
                      item.key === todayName
                        ? "border-[hsl(var(--comorin-teal-light)/0.4)] bg-[hsl(var(--comorin-teal)/0.18)]"
                        : "border-white/8 bg-white/[0.06]"
                    }`}
                  >
                    <span className="font-medium text-white/78">{item.day}</span>
                    <span className={item.isClosed ? "font-semibold text-comorin-teal-light" : "font-semibold text-white"}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
