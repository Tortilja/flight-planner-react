import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function DetailFlight() {
  const { id } = useParams();
  const [flight, setFlights] = useState(null);
  const [authTokenData, setAuthTokenData] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/flight/${id}`)
      .then(response => response.json())
      .then(data => setFlights(data))
      .catch(error => {
        console.error('Error fetching flight details', error);
      });
      const tokenData = localStorage.getItem('authToken');
      if (tokenData) {
        setAuthTokenData(JSON.parse(tokenData));
      }
  }, [id]);

  if (!flight) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container text-center">
        <h2>Flight Details</h2>

        <div className='row'>
            <div className='col-lg-4 col-sm-none'>
            </div>
            <div className='col-lg-4 col-sm-12'>
                <table className="table">
                <tbody>
                <tr>
                    <td>ID:</td>
                    <td>{flight.id}</td>
                </tr>
                <tr>
                    <td>From:</td>
                    <td>{flight.from.airport}</td>
                </tr>
                <tr>
                    <td>To:</td>
                    <td>{flight.to.airport}</td>
                </tr>
                <tr>
                    <td>Carrie:</td>
                    <td>{flight.carrier}</td>
                </tr>
                <tr>
                    <td>Departure Time:</td>
                    <td>{flight.departureTime}</td>
                </tr>
                <tr>
                    <td>Arrival Time:</td>
                    <td>{flight.arrivalTime}</td>
                </tr>
                </tbody>
                </table>
                {authTokenData ? (
            <>
              {authTokenData.role === 'ADMIN' && (
                <Link to="/adminFlight" className="btn btn-outline-primary mt-2">
                  Back to Flight List (Admin)
                </Link>
              )}
              <Link to="/customerFlight" className="btn btn-outline-primary mt-2">
                Back to Flight List
              </Link>
            </>
          ) : (
            <Link to="/customerFlight" className="btn btn-outline-primary mt-2">
              Back to Flight List
            </Link>
          )}
      
            </div>
            <div className='col-lg-4 col-sm-none'>
            </div>
        </div>
    </div>
  );
}

export default DetailFlight;