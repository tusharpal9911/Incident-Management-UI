import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditIncidentButton = ({ incidentId }) => {
  const navigate = useNavigate();

  const handleEditIncident = () => {
    navigate(`/edit-incident/${incidentId}`);
  };

  const styles = {
    button: {
      padding: '0.25rem 0.5rem',
      backgroundColor: '#ffc107',
      border: 'none',
      borderRadius: '0.25rem',
      cursor: 'pointer',
      color: 'white',
      margin: '0.25rem',
    },
  };

  return (
    <button style={styles.button} onClick={handleEditIncident}>
      Edit
    </button>
  );
};

export default EditIncidentButton;
