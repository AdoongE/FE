import { create } from 'zustand';

const useSearchStore = create((set) => ({
  keyword: '',
  setKeyword: (newKeyword) => set({ keyword: newKeyword }),

  recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || [],
  saveSearchQuery: (query) =>
    set((state) => {
      const newSearches = [query, ...state.recentSearches].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
      return { recentSearches: newSearches };
    }),
}));

export default useSearchStore;
