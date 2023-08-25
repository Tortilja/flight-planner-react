import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Airport() {
    const [airports, setAirports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/airportList') 
            .then(response => response.json())
            .then(data => setAirports(data));
    }, []);

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredAirports = airports.filter(airport =>
        airport.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.airport.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container text-center pt-2">
                    <h2>Airport List</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Country, City, or Airport"
                    value={searchTerm}
                    onChange={handleSearch}
                />
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
                    {filteredAirports.map(airport => (
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