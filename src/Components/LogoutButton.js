import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const styles = {
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '0.25rem',
      cursor: 'pointer',
    },
  };

  return (
    <button style={styles.button} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
