import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { LanguageProvider, useTranslation } from "@/i18n/LanguageContext";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
// This is the main entry point of the application. It sets up the React Query client, routing, and error handling.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const RouteError = () => {
  const { t } = useTranslation();
  return (
    <div className="grid min-h-screen place-items-center bg-comorin-gradient px-6 text-center text-white">
      <div>
        <h1 className="text-4xl font-semibold">{t.error.title}</h1>
        <p className="mt-3 text-white/76">{t.error.body}</p>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary fallback={<RouteError />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
