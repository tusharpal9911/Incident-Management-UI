import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/incidents');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
    },
    form: {
      background: '#fff',
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 0 1rem rgba(0, 0, 0, 0.1)',
      width: '20rem',
    },
    title: {
      marginBottom: '1.5rem',
      fontSize: '1.5rem',
      textAlign: 'center',
    },
    inputGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #ccc',
      borderRadius: '0.25rem',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '0.5rem',
      backgroundColor: '#00bfa6',
      color: 'white',
      border: 'none',
      borderRadius: '0.25rem',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    link: {
      display: 'block',
      textAlign: 'center',
      marginTop: '1rem',
      color: '#00bfa6',
      textDecoration: 'none',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>User Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div style={styles.error}>{error}</div>}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Log Me In</button>
        </form>
        <a href="/signup" style={styles.link}>Don't have an account? Signup</a>
      </div>
    </div>
  );
};

export default Login;
