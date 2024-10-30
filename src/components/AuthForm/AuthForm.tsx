import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../services/store';
import { loginUser, registerUser } from '../../services/auth/authActions';
import styles from './AuthForm.module.css';
import { useNavigate } from 'react-router-dom';

const AuthForm: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(registerUser(email, password, navigate));
    } else {
      dispatch(loginUser(username, password, navigate));
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form className={styles.authForm} onSubmit={handleAuthSubmit}>
        {isRegister ? (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        ) : (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        {error && <p className={styles.error}>{error}</p>}
        {isLoading ? (
          <div className={styles.loader}>Загрузка...</div>
        ) : (
        <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>
        )}
      </form>
      <button className={`${styles.button} ${styles.toggleButton}`} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'У вас уже есть аккаунт? Войти' : "Нет аккаунта? Зарегистрироваться"}
      </button>
    </div>
  );
};

export default AuthForm;