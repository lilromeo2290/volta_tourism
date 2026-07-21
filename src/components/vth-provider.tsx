"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Destination, TripPlan } from "@/lib/vth-data";

interface Favourite {
  id: string;
  type: "destination" | "event" | "story" | "business";
  name: string;
}

interface VTHContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  favourites: Favourite[];
  toggleFavourite: (item: Favourite) => void;
  isFavourite: (id: string) => boolean;
  generatedPlan: TripPlan | null;
  setGeneratedPlan: (plan: TripPlan | null) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const VTHContext = createContext<VTHContextType | undefined>(undefined);

export function VTHProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [generatedPlan, setGeneratedPlan] = useState<TripPlan | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  const toggleFavourite = useCallback((item: Favourite) => {
    setFavourites((prev) => {
      const exists = prev.find((f) => f.id === item.id);
      if (exists) return prev.filter((f) => f.id !== item.id);
      return [...prev, item];
    });
  }, []);

  const isFavourite = useCallback(
    (id: string) => favourites.some((f) => f.id === id),
    [favourites]
  );

  return (
    <VTHContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        favourites,
        toggleFavourite,
        isFavourite,
        generatedPlan,
        setGeneratedPlan,
        searchOpen,
        setSearchOpen,
        mobileMenuOpen,
        setMobileMenuOpen,
      }}
    >
      {children}
    </VTHContext.Provider>
  );
}

export function useVTH() {
  const ctx = useContext(VTHContext);
  if (!ctx) throw new Error("useVTH must be used within VTHProvider");
  return ctx;
}