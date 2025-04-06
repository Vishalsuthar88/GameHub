// redux/bookmarkSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      const game = action.payload;
      if (!state.find((g) => g.id === game.id)) {
        state.push(game);
      }
    },
    removeBookmark: (state, action) =>
      state.filter((game) => game.id !== action.payload),
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
