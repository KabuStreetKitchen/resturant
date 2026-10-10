import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const LanguageSwitcher = () => {
  const { lang, setLang, meta, t, languages } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`${t.nav.language} ${meta.label}`}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 text-sm font-semibold text-white/90 transition duration-300 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{meta.label}</span>
          <span className="uppercase tracking-wide sm:hidden">{meta.code}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="max-h-[70vh] w-56 overflow-y-auto"
      >
        {languages.map((language) => {
          const isActive = language.code === lang;
          return (
            <DropdownMenuItem
              key={language.code}
              onSelect={() => setLang(language.code)}
              dir={language.dir}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3",
                isActive && "font-semibold",
              )}
            >
              <span className="flex items-center gap-2">
                <span aria-hidden className="text-base leading-none">
                  {language.flag}
                </span>
                <span>{language.label}</span>
              </span>
              {isActive && <Check className="h-4 w-4 shrink-0" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
