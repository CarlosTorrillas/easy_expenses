import React from 'react';
import styles from './Login.module.css';

const Login = () => (
  <div className={styles.container}>
    <h1>Login or Register</h1>
    <form>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" />

      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" />

      <button type="submit">Login</button>
    </form>
    <button type="button">Register</button>
  </div>
);

export default Login;