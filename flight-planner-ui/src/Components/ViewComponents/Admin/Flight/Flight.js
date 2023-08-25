import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function FlightList() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const authTokenData  = localStorage.getItem('authToken');

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

    fetchFlights();
  }, [navigate]);

  const fetchFlights = () => {
    fetch('http://localhost:8080/flightList')
      .then(response => response.json())
      .then(data => setFlights(data))
      .catch(error => console.error('Error fetching flights:', error));
  };

  const handleDeleteFlight = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/deleteFlight/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authToken}`,
        },
      });
      if (response.ok) {
        console.log('Flight deleted successfully');
        window.alert('Flight deleted successfully');
        fetchFlights(); 
      } else {
        console.error('Error deleting Flight');
        window.alert('Error deleting Flight');
      }
    } catch (error) {
      console.error('Error deleting Flight', error);
      window.alert('Error deleting Flight');
    }
  };

  const handleDeleteAllFlights = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/deleteAllFlights', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authToken}`,
        },
      });
      if (response.ok) {
        console.log('All flights deleted successfully');
        window.alert('All flights deleted successfully');
        fetchFlights(); 
      } else {
        console.error('Error deleting all flights');
        window.alert('Error deleting all flights');
      }
    } catch (error) {
      console.error('Error deleting all flights', error);
      window.alert('Error deleting all flights');
    }
  };

  return (


    <div className="container text-center pt-2">

    <div className="row pb-2">
      <div className="col d-flex justify-content-between align-items-center">
        <h2>Flight List</h2>
        <Link to="/addFlight" className="btn btn-outline-success" type="button">
            Add New Flight
        </Link>
      </div>
    </div>
    
              <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="col-1">ID</th>
                            <th scope="col" className="col-2">From</th>
                            <th scope="col" className="col-2">To</th>
                            <th scope="col" className="col-2">Carrie</th>
                            <th scope="col" className="col-2">Departure Time</th>
                            <th scope="col" className="col-2">Arrival Time</th>
                            <th scope="col" className="col-1">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {flights.map(flight => (
                        <tr key={flight.id}>
                            <td>{flight.id}</td>
                            <td>{flight.from.airport}</td>
                            <td>{flight.to.airport}</td>
                            <td>{flight.carrier}</td>
                            <td>{flight.departureTime}</td>
                            <td>{flight.arrivalTime}</td>
                            <td>
                                <div className="btn-group d-flex" role="group">
            
                                    <Link to={`/flight/${flight.id}`} className="btn btn-outline-info" type="button">
                                      Details
                                    </Link>
                                    <Link to={`/updateFlight/${flight.id}`} className="btn btn-outline-primary" type="button">
                                      Edit
                                    </Link>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteFlight(flight.id)}>Delete</button>
                                </div>  
                            </td>
                        </tr>
                    ))}
                    </tbody>
            </table>
            <div className="row pb-2">
              <div className="col d-flex justify-content-end align-items-center">
              <button className="btn btn-outline-danger " onClick={handleDeleteAllFlights}>
                    Delete All Flights
              </button>
              </div>
            </div>
            
        </div>




    
  );
}

export default FlightList;