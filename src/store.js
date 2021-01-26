import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import roomsSlice from './features/roomsSlice/roomsSlice';

export default configureStore({
  reducer: roomsSlice,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === 'development'
      ? getDefaultMiddleware({ immutableCheck: false }).concat(logger)
      : getDefaultMiddleware(),
});
