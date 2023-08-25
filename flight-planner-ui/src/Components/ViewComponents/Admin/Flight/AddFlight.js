import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

function AddFlight() {
  const navigate = useNavigate(); 
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [carrier, setCarrier] = useState('');
  const [departureTime, setDepartureTime] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [airports, setAirports] = useState([]);
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
    fetchAirports();
  }, [navigate]);

  const fetchAirports = async () => {
    try {
      const response = await fetch('http://localhost:8080/airportList');
      const data = await response.json();
      setAirports(data);
    } catch (error) {
      console.error('Error fetching airports', error);
    }
  };

  const handleFromChange = event => {
    setFrom(event.target.value);
  };

  const handleToChange = event => {
    setTo(event.target.value);
  };

  const handleCarrierChange = event => {
    setCarrier(event.target.value);
  };

  const handleDepartureTimeChange = date => {
    setDepartureTime(date);
  };

  const handleArrivalTimeChange = date => {
    setArrivalTime(date);
  };

  const formatDatetime = datetime => {
    if (!datetime) return null;
    const formattedDate = new Date(datetime);
    const year = formattedDate.getFullYear();
    const month = ('0' + (formattedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + formattedDate.getDate()).slice(-2);
    const hours = ('0' + formattedDate.getHours()).slice(-2);
    const minutes = ('0' + formattedDate.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const addFlight = async () => {
    try {
        const response = await fetch('http://localhost:8080/admin/addFlight', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${authToken}`,
          },
          body: JSON.stringify({
            from: { id: from },
            to: { id: to },
            carrier,
            departureTime: formatDatetime(departureTime),
            arrivalTime: formatDatetime(arrivalTime),
          }),
        });
    
      if (response.ok) {
        console.log('Flight added successfully');
        window.alert('Flight added successfully');
        setFrom('');
        setTo('');
        setCarrier('');
        setDepartureTime(null);
        setArrivalTime(null);
        navigate('/adminFlight'); 
      } else {
        const errorText = await response.text();
        console.error('ERROR: adding flight', errorText);
        window.alert(`ERROR adding flight: ${errorText}`);
      }
    } catch (error) {
      console.error('ERROR adding flight', error);
      window.alert('ERROR adding flight');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <form className="text-center">
        <h2>Add Flight</h2>
        <div className="mb-3">
          <label className="form-label">From:</label>
          <select className="form-control" value={from} onChange={handleFromChange}>
            <option value="">Select an airport</option>
            {airports.map(airport => (
              <option key={airport.id} value={airport.id}>{airport.airport}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">To:</label>
          <select className="form-control" value={to} onChange={handleToChange}>
            <option value="">Select an airport</option>
            {airports.map(airport => (
              <option key={airport.id} value={airport.id}>{airport.airport}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Carrier:</label>
          <input type="text" className="form-control" value={carrier} onChange={handleCarrierChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Departure Time:</label>
          <div className="d-flex">
            <DatePicker
              selected={departureTime}
              onChange={handleDepartureTimeChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="yyyy-MM-dd HH:mm"
              className="form-control me-2"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Arrival Time:</label>
          <div className="d-flex">
          <DatePicker
                selected={arrivalTime}
                onChange={handleArrivalTimeChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="yyyy-MM-dd HH:mm"
                minDate={departureTime} // Set minimum date to departureTime
                className="form-control me-2"
            />
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={addFlight}>Add Flight</button>
      </form>
    </div>
  );
}

export default AddFlight;