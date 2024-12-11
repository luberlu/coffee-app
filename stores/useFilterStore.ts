import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const COFFEE_TYPES = [
  "Espresso",
  "Cappuccino",
  "Latte",
  "Americano",
  "Mocha",
] as const;

export const COFFEE_STRENGTHS = [
  "Mild",
  "Medium",
  "Strong",
  "Extra Strong",
] as const;

type CoffeeType = (typeof COFFEE_TYPES)[number];
type CoffeeStrength = (typeof COFFEE_STRENGTHS)[number];

export interface FilterState {
  selectedCoffeeType: CoffeeType | null;
  selectedCoffeeStrength: CoffeeStrength | null;
  coffeeTypes: typeof COFFEE_TYPES;
  coffeeStrengths: typeof COFFEE_STRENGTHS;
  setSelectedCoffeeType: (type: CoffeeType | null) => void;
  setSelectedCoffeeStrength: (strength: CoffeeStrength | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      selectedCoffeeType: null,
      selectedCoffeeStrength: null,
      coffeeTypes: COFFEE_TYPES,
      coffeeStrengths: COFFEE_STRENGTHS,
      setSelectedCoffeeType: (type: CoffeeType | null) =>
        set((state) => ({
          selectedCoffeeType: type === null ? null : 
            state.selectedCoffeeType === type ? null : type
        })),
      setSelectedCoffeeStrength: (strength: CoffeeStrength | null) =>
        set((state) => ({
          selectedCoffeeStrength: strength === null ? null : 
            state.selectedCoffeeStrength === strength ? null : strength
        })),
      searchQuery: '',
      setSearchQuery: (query: string) => set({ searchQuery: query }),
    }),
    {
      name: "filter-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
