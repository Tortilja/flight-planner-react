package io.codelex.flightplanner.Services.Airport;

import io.codelex.flightplanner.Models.Airport;

import java.util.List;

public interface  AirportInterfaceService {
    List<Airport> getAllAirport();
    Airport getAirportById(Long id);
    Airport addAirport(Airport airport);
    Airport updateAirport(Airport airport);
    void deleteAirport(Long id);
    List<Airport> searchAirports(String searchTerm) ;
}
