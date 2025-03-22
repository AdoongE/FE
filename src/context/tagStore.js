const { MyTag } = require('apis/TagApi');
const { create } = require('zustand');

const useTagStore = create((set) => ({
  tags: [],
  selectedTags: [],
  selectedFilter: '기본 태그',

  setTags: async () => {
    const myTags = await MyTag();
    set({ tags: Array.isArray(myTags) ? myTags : [] });
  },

  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
  setSelectedTags: (newTags) => set({ selectedTags: newTags }),

  addTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),

  resetTags: () => set({ selectedTags: [] }),
}));

export default useTagStore;
