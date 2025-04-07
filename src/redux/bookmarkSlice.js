
import { createSlice } from '@reduxjs/toolkit';
const loadBookmarks = () => {
  try {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Failed to load bookmarks from localStorage", err);
    return [];
  }
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    items: loadBookmarks(),
  },
  reducers: {
    addBookmark: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('bookmarks', JSON.stringify(state.items));
      }
    },
    removeBookmark: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('bookmarks', JSON.stringify(state.items));
    }
  }
});


export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
