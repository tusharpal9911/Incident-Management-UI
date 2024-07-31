import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [accountType, setAccountType] = useState('Individual');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const fetchLocationData = useCallback(async (pincode) => {
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${pincode}`); // using zippopotam API to get city state and country as per pincode.
      if (response.ok) {
        const data = await response.json();
        if (data && data.places && data.places.length > 0) {
          const place = data.places[0];
          setCity(place['place name']);
          setState(place['state']);
          setCountry(data['country']);
        } else {
          // alert('No location data found for the entered pincode.');
          clearLocationFields();
        }
      } else if (response.status === 404) {
        // alert('Location data not found for the entered pincode.');
        clearLocationFields();
      } else {
        throw new Error('An error occurred while fetching location data.');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      // alert('Error fetching location data.');
      clearLocationFields();
    }
  }, []);

  const clearLocationFields = () => {
    setCity('');
    setState('');
    setCountry('');
  };


  useEffect(() => {
    if (pincode) {
      const timer = setTimeout(() => {
        fetchLocationData(pincode);
      }, 500); // 1 second debounce

      return () => clearTimeout(timer);
    }
  }, [pincode, fetchLocationData]);

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const userData = {
      username: email,
      accountType: accountType,
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      country: country,
      phone: mobile,
      address: address,
      pincode: pincode,
      state: state,
      city: city,
    };

    try {
      const response = await fetch('http://localhost:8090/api/user/open/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Signup successful');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert('Signup failed: ' + errorData.message);
      }
    } catch (error) {
      alert('Signup failed: ' + error.message);
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
      width: '70%',
      maxWidth: '50rem',
    },
    title: {
      marginBottom: '1.5rem',
      fontSize: '1.5rem',
      textAlign: 'center',
    },
    inputGroup: {
      marginBottom: '1rem',
      display: 'flex',
      flexDirection: 'column',
    },
    inputRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
    },
    inputHalf: {
      flex: '1',
      marginRight: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
    },
    inputLast: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
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
    radioGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
    },
    radio: {
      marginRight: '0.5rem',
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.radioGroup}>
            <label style={styles.label}>Individual/Enterprise/Government</label>
            <label>
              <input
                type="radio"
                value="Individual"
                checked={accountType === 'Individual'}
                onChange={(e) => setAccountType(e.target.value)}
                style={styles.radio}
              />
              Individual
            </label>
            <label>
              <input
                type="radio"
                value="Enterprise"
                checked={accountType === 'Enterprise'}
                onChange={(e) => setAccountType(e.target.value)}
                style={styles.radio}
              />
              Enterprise
            </label>
            <label>
              <input
                type="radio"
                value="Government"
                checked={accountType === 'Government'}
                onChange={(e) => setAccountType(e.target.value)}
                style={styles.radio}
              />
              Government
            </label>
          </div>
          <div style={styles.inputRow}>
            <div style={styles.inputHalf}>
              <label style={styles.label}>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputLast}>
              <label style={styles.label}>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputRow}>
            <div style={styles.inputHalf}>
              <label style={styles.label}>Country:</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputLast}>
              <label style={styles.label}>State:</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.inputRow}>
            <div style={styles.inputHalf}>
              <label style={styles.label}>City:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputLast}>
              <label style={styles.label}>Pincode:</label>
              <input
                type="text"
                value={pincode}
                onChange={handlePincodeChange}
                required
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.inputRow}>
            <div style={styles.inputHalf}>
              <label style={styles.label}>Country Code:</label>
              <input
                type="text"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Mobile Number:</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                style={styles.input}
              />
            </div>
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
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Signup</button>
        </form>
        <a href="/login" style={styles.link}>Already have an account? Login</a>
      </div>
    </div>
  );
};

export default Signup;