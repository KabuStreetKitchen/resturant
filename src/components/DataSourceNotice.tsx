import { AlertTriangle } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface DataSourceNoticeProps {
  errorMessage: string | null;
  resource: string;
  className?: string;
}

const DataSourceNotice = ({ errorMessage, resource, className }: DataSourceNoticeProps) => {
  const { t } = useTranslation();

  if (!errorMessage) return null;

  return (
    <div
      role="alert"
      data-resource={resource}
      className={cn(
        "flex items-start gap-3 rounded-lg border border-amber-300/35 bg-amber-950/55 px-4 py-3 text-amber-50 shadow-lg backdrop-blur-md",
        className,
      )}
    >
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold">{t.error.title}</p>
        <p className="mt-1 text-xs leading-5 text-amber-50/80">{t.error.body}</p>
        {import.meta.env.DEV && (
          <p className="mt-2 break-all font-mono text-[11px] leading-4 text-amber-200/75">
            {resource}: {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default DataSourceNotice;
