import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

function AddAirport() {
  const navigate = useNavigate(); 
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [airport, setAirport] = useState('');
  const [authToken, setAuthToken] = useState('');

  
  useEffect(() => {
    const authTokenData = localStorage.getItem('authToken');

    if (!authTokenData) {
      navigate('/login');
      return;
    }

    const { authToken: token, expirationTime } = JSON.parse(authTokenData);

    if (new Date().getTime() > expirationTime) {
      localStorage.removeItem('authToken');
      navigate('/login');
      return;
    }

    setAuthToken(token); // Iestatiet authToken vērtību
  }, [navigate]);

  const handleCountryChange = event => {
    setCountry(event.target.value);
  };

  const handleCityChange = event => {
    setCity(event.target.value);
  };

  const handleAirportChange = event => {
    setAirport(event.target.value);
  };
 
  const addAirport = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/addAirport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authToken}`,
        },
        body: JSON.stringify({ country, city, airport }),
      });
      if (response.ok) {
        console.log('Airport added successfully');
        window.alert('Airport added successfully');
        setCountry('');
        setCity('');
        setAirport('');
        navigate('/adminAirport'); 
      } else {
        console.error('ERROR: adding airport');
        window.alert('ERROR adding airport');
      }
    } catch (error) {
      console.error('ERROR adding airport', error);
      window.alert('ERROR adding airport');
    }
  };

  return (
<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
  <form className="text-center ">
    <h2>Add Airport</h2>
    <div className="mb-3">
      <label className="form-label">Country:</label>
      <input type="text" className="form-control" value={country} onChange={handleCountryChange} />
    </div>
    <div className="mb-3">
      <label className="form-label">City:</label>
      <input type="text" className="form-control" value={city} onChange={handleCityChange} />
    </div>
    <div className="mb-3">
      <label className="form-label">Airport:</label>
      <input type="text" className="form-control" value={airport} onChange={handleAirportChange} />
    </div>
    <button type="button" className="btn btn-primary" onClick={addAirport}>Add Airport</button>
  </form>
</div>
  );
}

export default AddAirport;