"use client";

import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className={styles.container}>
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      {isRegister ? (
        <form>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />

          <button type="submit">Register</button>
        </form>
      ) : (
        <form>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />

          <button type="submit">Login</button>
        </form>
      )}

      <button
        type="button"
        onClick={() => setIsRegister((prev) => !prev)}
        className={styles.toggle}
      >
        {isRegister ? 'Back to Login' : 'Register'}
      </button>

      {isRegister && (
        <button
          type="button"
          className={styles.google}
          // onClick={handleGoogleRegister} // implement later
        >
          Register with Google wip
        </button>
      )}
    </div>
  );
};

export default Login;