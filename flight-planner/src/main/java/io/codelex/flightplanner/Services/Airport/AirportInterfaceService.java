package io.codelex.flightplanner.Services.Airport;

import io.codelex.flightplanner.Models.Airport;

import java.util.List;

public interface  AirportInterfaceService {
    List<Airport> getAllAirport();
    Airport addAirport(Airport airport);
}
