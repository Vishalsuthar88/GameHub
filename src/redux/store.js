// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import bookmarkReducer from './bookmarkSlice';

export const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
  },
});
