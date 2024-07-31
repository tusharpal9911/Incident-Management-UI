import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import AddIncidentButton from './AddIncidentButton';
import EditIncidentButton from './EditIncidentButton';
import LogoutButton from './LogoutButton';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [alertShown, setAlertShown] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    console.log("useEffect triggered"); 
    const fetchIncidents = async () => {
      try {
        const sessionId = localStorage.getItem('sessionId');
        const reporterId = localStorage.getItem('userId');
        console.log("Session ID:", sessionId); 

        if (!sessionId && !alertShown) {
          setAlertShown(true); 
          alert('Session expired. Please log in.');
          navigate('/login'); //returing to login page if session expires.
          return; 
        }

        if (sessionId) {
          const response = await axios.get('http://localhost:8090/api/incident/user', {
            headers: {
              'Authorization': `Bearer ${sessionId}`
            },
            params: { reporterId }
          });
          console.log("API response:", response); 
          setIncidents(response.data);
        }
      } catch (error) {
        console.error("Error fetching incidents:", error);
        if (error.response && error.response.status === 401 && !alertShown) {
          setAlertShown(true); // Set alertShown before showing the alert
          alert('Session expired. Please log in again.');
          logout();
          navigate('/login');
        }
      }
    };

    fetchIncidents();
  }, [navigate, logout, alertShown]);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
      height: '100vh',
      backgroundColor: '#f5f5f5',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      padding: '1rem',
      backgroundColor: '#00bfa6',
      color: 'white',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
    },
    tableContainer: {
      width: '100%',
      overflowX: 'auto',
      backgroundColor: '#fff',
      borderRadius: '0.5rem',
      boxShadow: '0 0 1rem rgba(0, 0, 0, 0.1)',
      padding: '1rem',
      marginTop: '1rem',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      padding: '1rem',
      textAlign: 'center', 
      backgroundColor: '#00bfa6',
      color: 'white',
    },
    td: {
      padding: '1rem',
      textAlign: 'center', 
      borderBottom: '1px solid #ddd',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Incident List</h1>
        <div style={styles.buttonGroup}>
          <AddIncidentButton />
          <LogoutButton />
        </div>
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Incident ID</th>
              <th style={styles.th}>Details</th>
              <th style={styles.th}>Reported Date</th>
              <th style={styles.th}>Priority</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Reporter Name</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.incidentId}>
                <td style={styles.td}>{incident.incidentId}</td>
                <td style={styles.td}>{incident.details}</td>
                <td style={styles.td}>{new Date(incident.reportedDateTime).toLocaleString()}</td>
                <td style={styles.td}>{incident.priority}</td>
                <td style={styles.td}>{incident.status}</td>
                <td style={styles.td}>{incident.reporterName}</td>
                <td style={styles.td}>
                  {incident.status.toLowerCase() !== 'closed' && (
                    <EditIncidentButton incidentId={incident.incidentId} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentList;
