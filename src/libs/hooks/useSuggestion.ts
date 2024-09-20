import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
interface SuggestionState {
  selectedFeed: any;
  setSelectedFeed: (item: any) => void;
}
export const useSuggestion = create(
  persist<SuggestionState>(
    (set, get) => ({
      selectedFeed: null,
      setSelectedFeed: (item: any) => set({ selectedFeed: item }),
    }),
    {
      name: 'selected',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
