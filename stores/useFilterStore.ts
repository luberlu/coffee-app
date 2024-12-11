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

type CoffeeType = (typeof COFFEE_TYPES)[number];

export interface FilterState {
  selectedCoffeeType: CoffeeType | null;
  coffeeTypes: typeof COFFEE_TYPES;
  setSelectedCoffeeType: (type: CoffeeType | null) => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      selectedCoffeeType: null,
      coffeeTypes: COFFEE_TYPES,
      setSelectedCoffeeType: (type: CoffeeType | null) =>
        set({ selectedCoffeeType: type }),
    }),
    {
      name: "filter-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
