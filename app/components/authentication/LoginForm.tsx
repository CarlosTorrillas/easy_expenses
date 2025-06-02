"use client";

import React, { useState } from 'react';
import styles from './Login.module.css';

type LoginFormProps = {
  onSwitchToRegister: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState<{ email?: string, password?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined }); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: { email?: string, password?: string} = {};
    if (!form.email) {
      newErrors.email = 'Email is required';
    }
    // Add similar check for password if needed
    if (!form.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) setLoggedIn(true);
    // else show error (optional)
  };

  if (loggedIn) {
    return <div>Welcome home!</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && (
          <div style={{ color: 'red' }}>{errors.email}</div>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && (
          <div style={{ color: 'red' }}>{errors.password}</div>
        )}
        
        <button type="submit">Login</button>
      </form>
      <button type="button" onClick={onSwitchToRegister}>Register</button>
    </div>
  );
};

export default LoginForm;