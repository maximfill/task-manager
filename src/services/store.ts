import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todos/todosSlice';
import authReducer from './auth/authSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();