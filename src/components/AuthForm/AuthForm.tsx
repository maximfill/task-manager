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

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(registerUser(email, password));
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
        <button type="submit" className={styles.submitButton}>
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <button className={styles.toggleButton} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default AuthForm;