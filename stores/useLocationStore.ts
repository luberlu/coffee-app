import { create } from 'zustand';

interface LocationState {
  location: string;
  setLocation: (location: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: '',
  setLocation: (location) => set({ location }),
})); 