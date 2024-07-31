import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddIncidentButton = () => {
  const navigate = useNavigate();

  const handleAddIncident = () => {
    navigate('/add-incident');
  };

  const styles = {
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#fff',
      color: '#00bfa6',
      border: '1px solid #00bfa6',
      borderRadius: '0.25rem',
      cursor: 'pointer',
    },
  };

  return (
    <button style={styles.button} onClick={handleAddIncident}>
      Add Incident
    </button>
  );
};

export default AddIncidentButton;
