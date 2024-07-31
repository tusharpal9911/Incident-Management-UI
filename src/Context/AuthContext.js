import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8090/api/user/open/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        localStorage.setItem('sessionId', data.sessionId); // Storing session ID in local storage
        localStorage.setItem('userId', data.userId); // Storing userId in local storage
        navigate('/incidents'); // Redirecting to the incident listing page
      } else {
        const errorData = await response.json();
        alert('Login failed: ' + errorData.message);
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sessionId'); // Removing session ID from local storage
    navigate('/login'); // Redirecting to the login page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
