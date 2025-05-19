"use client";

import React, { useState } from 'react';
import styles from './Login.module.css';

const registerCustomer = async (data: { name: string; email: string; password: string }) => {

  console.log("here we are", data)
  const res = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerCustomer(form);
      setRegisterSuccess(true);      // Show success message
      setIsRegister(false);          // Switch to login form
      setForm({ name: '', email: '', password: '' });
    } catch {
      // handle error
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      {registerSuccess && !isRegister && (
        <div style={{ color: '#22c55e', textAlign: 'center', marginBottom: 12 }}>
          Registration successful! Please log in.
        </div>
      )}
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      {isRegister ? (
        <form onSubmit={handleRegister}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange} />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} />

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
        >
          Register with Google
        </button>
      )}
    </div>
  );
};

export default Login;