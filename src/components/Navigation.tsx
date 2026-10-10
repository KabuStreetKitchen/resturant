import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/i18n/LanguageContext";
import kabulLogo from "@/assets/kabul-logo.jpg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { href: "#welcome", label: t.nav.start },
    { href: "#eat", label: t.nav.menu },
    { href: "#drink", label: t.nav.drinks },
    { href: "#team", label: t.nav.story },
    { href: "#contact", label: t.nav.contact },
  ];

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/15 bg-comorin-gradient text-white shadow-elegant backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <button
            onClick={() => scrollToSection("#welcome")}
            className="group flex items-center gap-3 text-left"
            aria-label={`Kabul Street Kitchen ${t.nav.logoSubtitle}`}
          >
            <img
              src={kabulLogo}
              alt="Kabul Street Kitchen Logo"
              className="h-12 w-12 rounded-lg border border-white/15 object-cover shadow-lg"
            />
            <span className="hidden sm:block">
              <span className="block font-logo text-xl uppercase leading-none tracking-[0.12em] text-white">
                Kabul Street Kitchen
              </span>
              <span className="mt-1 block text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-comorin-teal-light">
                {t.nav.logoSubtitle}
              </span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/70 transition duration-300 hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <LanguageSwitcher />

            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 text-white hover:bg-white/10 md:hidden"
              onClick={() => setIsOpen((value) => !value)}
              aria-label={t.nav.toggleAria}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/15 bg-comorin-overlay backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-5">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="rounded-lg px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.16em] text-white/78 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </button>
              ))}

            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
