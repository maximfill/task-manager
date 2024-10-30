import { loginSuccess, registerSuccess, authFailure, setIsLoading } from './authSlice';
import { login, register } from './authService';
import { AppDispatch } from '../store';
import { NavigateFunction } from 'react-router-dom';


export const loginUser = (username: string, password: string, navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
  dispatch(setIsLoading(true));
  try {
    const token = await login(username, password);
    if (token) {
      dispatch(loginSuccess({ token, username }));
      navigate('/');
    }

  } catch (error) {
    dispatch(authFailure('Login failed'));
  }
  dispatch(setIsLoading(false));
};


export const registerUser = (email: string, password: string, navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
  dispatch(setIsLoading(true));
  const errorMessage = await register(email, password);
  if (!errorMessage) {
    dispatch(registerSuccess({ token: null, email }));
    navigate('/login');
  } else {
    dispatch(authFailure(errorMessage));
  }
  dispatch(setIsLoading(false));
};
