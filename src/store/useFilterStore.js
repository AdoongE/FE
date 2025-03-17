import { create } from 'zustand';

const useFilterStore = create((set) => ({
  tags: [],
  isFilterVisible: false,
  setTags: (newTags) => set({ tags: newTags }),
  toggleFilterVisibility: () =>
    set((state) => ({ isFilterVisible: !state.isFilterVisible })),
}));

export default useFilterStore;
