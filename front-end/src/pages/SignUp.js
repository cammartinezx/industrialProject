import React from 'react';
import styles from '../styles/SignUp.module.css';

const SignUp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Sign Up</h2>
        <form>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="name">Name</label>
            <input className={styles.input} type="text" id="name" name="name" required />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input className={styles.input} type="email" id="email" name="email" required />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input className={styles.input} type="password" id="password" name="password" required />
          </div>
          <button className={styles.button} type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
