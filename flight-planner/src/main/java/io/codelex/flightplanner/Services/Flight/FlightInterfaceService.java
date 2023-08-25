package io.codelex.flightplanner.Services.Flight;

import io.codelex.flightplanner.Models.Flight;

import java.util.List;

public interface FlightInterfaceService {
    List<Flight> getAllFlights();
    Flight getFlightById(Long id);
    Flight addFlight(Flight flight);
    Flight updateFlight(Flight flight);
    void deleteFlight(Long id);
    void deleteAllFlights();
    List<Flight> searchFlights(String searchTerm);
}
