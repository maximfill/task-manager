import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from '../../interfaces/interfaces';

const initialState: IAuthState = {
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  username: null,
  email: null,
  error: null,
  isLoading: false,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginSuccess(state, action: PayloadAction<{ token: string; username: string }>) {
      state.isLoading = true;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    registerSuccess(state, action: PayloadAction<{ token: string | null; email: string }>) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.error = null;
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
      }
    },
    authFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    initializeAuth(state) {
      if (state.token) {
        state.isAuthenticated = true;
      }
    },
  },
});

export const { setIsLoading,loginSuccess, registerSuccess, authFailure, initializeAuth } = authSlice.actions;
export default authSlice.reducer;



