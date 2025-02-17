import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Login</h2>
        <form>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input className={styles.input} type="email" id="email" name="email" required />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input className={styles.input} type="password" id="password" name="password" required />
          </div>
          <button className={styles.button} type="submit" onClick={() => navigate('/home')}>Login</button>
        </form>
        <p className={styles.signUpText}>
          Don’t have an account?{' '}
          <span className={styles.signUpLink} onClick={() => navigate('/sign-up')}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
