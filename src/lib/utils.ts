import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Apple devices open Apple Maps, everything else Google Maps.
export function directionsUrl(address: string): string {
  const q = encodeURIComponent(address);
  return /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)
    ? `https://maps.apple.com/?q=${q}`
    : `https://www.google.com/maps/search/?api=1&query=${q}`;
}
