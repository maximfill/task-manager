import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  email: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  username: null,
  email: null,
  error: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; username: string }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    registerSuccess(state, action: PayloadAction<{ token: string | null; email: string }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.error = null;
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
      }
    },
    authFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.username = null;
      state.email = null;
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, registerSuccess, authFailure, logout } = authSlice.actions;
export default authSlice.reducer;