import { create } from 'zustand';

const useDropdownStore = create((set) => ({
  sortOrder: '최신순',
  selectedFormat: '저장형식',

  setSortOrder: (order) => set({ sortOrder: order }),
  setSelectedFormat: (format) => set({ selectedFormat: format }),

  resetDropdowns: () => set({ sortOrder: '정렬', selectedFormat: '전체보기' }),
}));

export default useDropdownStore;
