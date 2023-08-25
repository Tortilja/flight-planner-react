import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateAirport() {
  const navigate = useNavigate(); 
  const { id } = useParams();
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

    setAuthToken(token);

    fetch(`http://localhost:8080/airport/${id}`)
      .then(response => response.json())
      .then(data => {
        setCountry(data.country);
        setCity(data.city);
        setAirport(data.airport);
      })
      .catch(error => {
        console.error('Error fetching airport details', error);
      });

  }, [navigate, id]);

  const handleCountryChange = event => {
    setCountry(event.target.value);
  };

  const handleCityChange = event => {
    setCity(event.target.value);
  };

  const handleAirportChange = event => {
    setAirport(event.target.value);
  };


  const updateAirport = async () => {
    try {
      const response = await fetch(`http://localhost:8080/admin/updateAirport/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authToken}`,
        },
        body: JSON.stringify({
          country: country,
          city: city,
          airport: airport,
        }),
      });
      if (response.ok) {
        console.log('Airport updated successfully');
        window.alert('Airport updated successfully');
        navigate('/adminAirport');
      } else {
        console.error('ERROR updating airport');
        window.alert('ERROR updating airport');
      }
    } catch (error) {
      console.error('ERROR updating airport', error);
      window.alert('ERROR updating airport');
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <form className="text-center">
        <h2>Update Airport</h2>
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
        <button type="button" className="btn btn-primary" onClick={updateAirport}>Update Airport</button>
      </form>
    </div>
  );
}

export default UpdateAirport;