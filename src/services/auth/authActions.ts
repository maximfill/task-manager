import { loginSuccess, registerSuccess, authFailure } from './authSlice';
import { login, register } from './authService';
import { AppDispatch } from '../store';
import { NavigateFunction } from 'react-router-dom';


export const loginUser = (username: string, password: string, navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
  try {
    const token = await login(username, password);
    if (token) {
      dispatch(loginSuccess({ token, username }));
      navigate('/');
    }

  } catch (error) {
    dispatch(authFailure('Login failed'));
  }
};


export const registerUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    await register(email, password);
    dispatch(registerSuccess({ token: null, email }));

  } catch (error) {
    dispatch(authFailure('Registration failed'));
  }
};
