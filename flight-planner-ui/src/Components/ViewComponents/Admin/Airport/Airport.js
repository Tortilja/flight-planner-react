import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Airport() {
    const navigate = useNavigate();
    const [airports, setAirport] = useState([]);
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

      fetch('http://localhost:8080/airportList', {
          method: 'GET',
          headers: {
            Authorization: `Basic ${token}`,
        },
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch airport data');
          }
          return response.json();
      })
      .then(data => setAirport(data))
      .catch(error => {
          console.error(error);
      }); 

      setAuthToken(token);

  }, [navigate]);

  const handleDeleteAirport = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/deleteAirport/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authToken}`,
        },
      });
      if (response.ok) {
        console.log('Airport deleted successfully');
        window.alert('Airport deleted successfully');
        // Atjauniniet airport sarakstu
        fetch('http://localhost:8080/airportList') 
          .then(response => response.json())
          .then(data => setAirport(data));
      } else {
        console.error('Error deleting Airport');
        window.alert('Error deleting Airport');
      }
    } catch (error) {
      console.error('Error deleting Airport', error);
      window.alert('Error deleting Airport');
    }
  };

  return (
  <div className="container text-center pt-2">

<div className="row pb-2">
  <div className="col d-flex justify-content-between align-items-center">
    <h2>Airport List</h2>
    <Link to="/addAirport" className="btn btn-outline-success" type="button">
        Add New Airport
    </Link>
  </div>
</div>

          <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" className="col-1">ID</th>
                        <th scope="col" className="col-3">Country</th>
                        <th scope="col" className="col-3">City</th>
                        <th scope="col" className="col-3">Airport</th>
                        <th scope="col" className="col-2">Options</th>
                    </tr>
                </thead>
                <tbody>
                {airports.map(airport => (
                    <tr key={airport.id}>
                        <td>{airport.id}</td>
                        <td>{airport.country}</td>
                        <td>{airport.city}</td>
                        <td>{airport.airport}</td>
                        <td>
                            <div className="btn-group d-flex" role="group">
                                <Link to={`/airport/${airport.id}`} className="btn btn-outline-info" type="button">
                                    Details
                                </Link>
                                <Link to={`/updateAirport/${airport.id}`} className="btn btn-outline-primary" type="button">
                                    Edit
                                </Link>
                                <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteAirport(airport.id)}>Delete</button>
                            </div>  
                        </td>
               
                    </tr>
                ))}
                </tbody>
        </table>
    </div>
  );
} 

export default Airport;