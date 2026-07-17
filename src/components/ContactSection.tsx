import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";
import grillAmbient from "@/assets/grill.jpg";
import { useContactInfo } from "@/hooks/useRestaurantData";
import { useTranslation } from "@/i18n/LanguageContext";
import DataSourceNotice from "@/components/DataSourceNotice";

const ContactSection = () => {
  const { data: contactInfo, errorMessage } = useContactInfo();
  const { t } = useTranslation();

  const getContactByType = (type: string) => contactInfo.filter((info) => info.type === type);
  const phone = getContactByType("phone")[0];
  const address = getContactByType("address")[0];
  const email = getContactByType("email")[0];
  const deliveryTime = getContactByType("delivery_time")[0];
  const socials = getContactByType("social");

  // Field labels are part of the UI chrome, so translate them; the values
  // (number, address, e-mail) stay exactly as stored.
  const contactLabels: Record<string, string> = {
    phone: t.contact.labelPhone,
    address: t.contact.labelAddress,
    email: t.contact.labelEmail,
    delivery_time: t.contact.labelDelivery,
  };
  const labelFor = (type: string, fallback: string) => contactLabels[type] ?? fallback;

  return (
    <section id="contact" className="section-band section-band-contact relative isolate overflow-hidden">
      <div className="absolute inset-0 depth-pattern opacity-30" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <DataSourceNotice errorMessage={errorMessage} resource="contact" className="mb-8" />
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-center">
          <div className="text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light backdrop-blur-md">
              <MapPin className="h-4 w-4" />
              {t.contact.badge}
            </div>
            <h2 className="font-heading text-[clamp(3rem,8vw,7rem)] font-semibold uppercase leading-[0.92] tracking-tight">
              {t.contact.title}
            </h2>
            <p className="mt-6 max-w-xl text-xl leading-8 text-white/74">
              {t.contact.intro}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={phone ? `tel:${phone.value.replace(/\s/g, "")}` : undefined}
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-comorin-teal px-7 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-elegant transition duration-300 hover:-translate-y-0.5 hover:bg-comorin-teal-light"
              >
                <Phone className="h-4 w-4" />
                {t.contact.call}
              </a>
            </div>
          </div>

          <div className="depth-stage">
            <div className="contact-scene relative min-h-[640px] overflow-hidden rounded-xl border border-white/12 shadow-[0_40px_120px_hsl(var(--comorin-teal-dark)/0.5)]">
              <img
                src={grillAmbient}
                alt="Kabul Street Kitchen Atmosphäre"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--comorin-teal-dark)/0.9)_0%,hsl(var(--comorin-teal-dark)/0.55)_55%,hsl(var(--comorin-teal-dark)/0.24)_100%)]" />

              <div className="absolute inset-x-5 bottom-5 grid gap-4 text-white md:grid-cols-2">
                <div className="contact-tile md:col-span-2">
                  <MapPin className="h-5 w-5 text-comorin-teal-light" />
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/52">Kabul Street Kitchen</span>
                    <span className="mt-1 block text-lg font-semibold">{t.contact.brandTagline}</span>
                  </span>
                </div>
                {phone && (
                  <a href={`tel:${phone.value.replace(/\s/g, "")}`} className="contact-tile">
                    <Phone className="h-5 w-5 text-comorin-teal-light" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/52">{labelFor("phone", phone.label)}</span>
                      <span className="mt-1 block text-lg font-semibold">{phone.value}</span>
                    </span>
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email.value}`} className="contact-tile">
                    <Mail className="h-5 w-5 text-comorin-teal-light" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/52">{labelFor("email", email.label)}</span>
                      <span className="mt-1 block text-lg font-semibold">{email.value}</span>
                    </span>
                  </a>
                )}
                {address && (
                  <div className="contact-tile md:col-span-2">
                    <MapPin className="h-5 w-5 text-comorin-teal-light" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/52">{labelFor("address", address.label)}</span>
                      <span className="mt-1 block text-lg font-semibold">{address.value}</span>
                    </span>
                  </div>
                )}
                {deliveryTime && (
                  <div className="contact-tile">
                    <Clock className="h-5 w-5 text-comorin-teal-light" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/52">{labelFor("delivery_time", deliveryTime.label)}</span>
                      <span className="mt-1 block text-lg font-semibold">{deliveryTime.value}</span>
                    </span>
                  </div>
                )}
                {!!socials.length && (
                  <div className="contact-tile">
                    <Instagram className="h-5 w-5 text-comorin-teal-light" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/52">{t.contact.socialMedia}</span>
                      <span className="mt-1 block text-lg font-semibold">
                        {socials.map((item) => item.value).join(" / ")}
                      </span>
                    </span>
                  </div>
                )}
              </div>

              <div className="absolute left-5 top-5 hidden rounded-lg border border-white/12 bg-comorin-teal-dark/45 p-5 text-white backdrop-blur-xl lg:block">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-comorin-teal-light">Kabul Street Kitchen</p>
                <p className="mt-2 max-w-xs text-3xl font-semibold leading-tight">{t.contact.cardTagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
