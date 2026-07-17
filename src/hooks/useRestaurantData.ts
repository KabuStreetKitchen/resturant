import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  fallbackContactInfo,
  fallbackDrinkCategories,
  fallbackMenuCategories,
  fallbackOpeningHours,
  normalizeDrinkCategories,
  normalizeMenuCategories,
  type ContactInfo,
  type DrinkCategory,
  type MenuCategory,
  type OpeningHour,
} from "@/data/restaurantData";

// Stable query keys for every piece of restaurant content.
export const restaurantKeys = {
  menu: ["menu-categories"] as const,
  drinks: ["drink-categories"] as const,
  contact: ["contact-info"] as const,
  hours: ["opening-hours"] as const,
};

const liveQueryOptions = {
  staleTime: 30 * 1000,
  refetchInterval: 60 * 1000,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  retry: 2,
} as const;

export interface RestaurantQueryState<T> {
  data: T;
  errorMessage: string | null;
  isFallback: boolean;
  isFetching: boolean;
}

interface RestaurantQueryObserver<T> {
  data: T | undefined;
  error: Error | null;
  isPlaceholderData: boolean;
  isFetching: boolean;
}

const missingConfigurationMessage =
  "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.";

const requireRows = <T>(rows: T[] | null, resource: string): T[] => {
  if (!rows?.length) {
    throw new Error(`Supabase returned no rows for ${resource}.`);
  }

  return rows;
};

function useRestaurantQueryState<T>(
  query: RestaurantQueryObserver<T>,
  fallback: T,
  resource: string,
): RestaurantQueryState<T> {
  useEffect(() => {
    if (query.error) {
      console.error(`[restaurant-data:${resource}]`, query.error);
    }
  }, [query.error, resource]);

  const errorMessage = !supabase
    ? missingConfigurationMessage
    : query.error?.message ?? null;

  return {
    data: query.data ?? fallback,
    errorMessage,
    isFallback: !supabase || !query.data || query.isPlaceholderData,
    isFetching: query.isFetching,
  };
}

const fetchMenuCategories = async (): Promise<MenuCategory[]> => {
  if (!supabase) throw new Error(missingConfigurationMessage);

  const { data, error } = await supabase
    .from("menu_categories")
    .select(`*, menu_items (*)`)
    .order("display_order");

  if (error) throw error;
  return normalizeMenuCategories(
    requireRows(data as MenuCategory[] | null, "menu categories"),
  );
};

export function useMenuCategories(): RestaurantQueryState<MenuCategory[]> {
  const query = useQuery({
    queryKey: restaurantKeys.menu,
    queryFn: fetchMenuCategories,
    placeholderData: fallbackMenuCategories,
    enabled: !!supabase,
    ...liveQueryOptions,
  });

  return useRestaurantQueryState(query, fallbackMenuCategories, "menu");
}

const fetchDrinkCategories = async (): Promise<DrinkCategory[]> => {
  if (!supabase) throw new Error(missingConfigurationMessage);

  const { data, error } = await supabase
    .from("drink_categories")
    .select(`*, drink_items (*)`)
    .order("display_order");

  if (error) throw error;
  return normalizeDrinkCategories(
    requireRows(data as DrinkCategory[] | null, "drink categories"),
  );
};

export function useDrinkCategories(): RestaurantQueryState<DrinkCategory[]> {
  const query = useQuery({
    queryKey: restaurantKeys.drinks,
    queryFn: fetchDrinkCategories,
    placeholderData: fallbackDrinkCategories,
    enabled: !!supabase,
    ...liveQueryOptions,
  });

  return useRestaurantQueryState(query, fallbackDrinkCategories, "drinks");
}

const fetchContactInfo = async (): Promise<ContactInfo[]> => {
  if (!supabase) throw new Error(missingConfigurationMessage);

  const { data, error } = await supabase
    .from("contact_info")
    .select("*")
    .order("display_order");

  if (error) throw error;
  return requireRows(data as ContactInfo[] | null, "contact information");
};

export function useContactInfo(): RestaurantQueryState<ContactInfo[]> {
  const query = useQuery({
    queryKey: restaurantKeys.contact,
    queryFn: fetchContactInfo,
    placeholderData: fallbackContactInfo,
    enabled: !!supabase,
    ...liveQueryOptions,
  });

  return useRestaurantQueryState(query, fallbackContactInfo, "contact");
}

const fetchOpeningHours = async (): Promise<OpeningHour[]> => {
  if (!supabase) throw new Error(missingConfigurationMessage);

  const { data, error } = await supabase
    .from("opening_hours")
    .select("*")
    .order("day_of_week");

  if (error) throw error;
  return requireRows(data as OpeningHour[] | null, "opening hours");
};

export function useOpeningHours(): RestaurantQueryState<OpeningHour[]> {
  const query = useQuery({
    queryKey: restaurantKeys.hours,
    queryFn: fetchOpeningHours,
    placeholderData: fallbackOpeningHours,
    enabled: !!supabase,
    ...liveQueryOptions,
  });

  return useRestaurantQueryState(query, fallbackOpeningHours, "opening-hours");
}

export function useRestaurantRealtimeSync(): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!supabase) return undefined;

    const invalidate = (queryKey: readonly string[]) => {
      void queryClient.invalidateQueries({ queryKey });
    };

    const channel = supabase
      .channel("restaurant-public-content")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "menu_categories" },
        () => invalidate(restaurantKeys.menu),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "menu_items" },
        () => invalidate(restaurantKeys.menu),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "drink_categories" },
        () => invalidate(restaurantKeys.drinks),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "drink_items" },
        () => invalidate(restaurantKeys.drinks),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_info" },
        () => invalidate(restaurantKeys.contact),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "opening_hours" },
        () => invalidate(restaurantKeys.hours),
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.error(`[restaurant-data:realtime] ${status}`);
        }
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
