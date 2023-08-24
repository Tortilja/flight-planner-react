package io.codelex.flightplanner.Services.Airport;

import io.codelex.flightplanner.Models.Airport;
import io.codelex.flightplanner.Repository.AirportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AirportService implements AirportInterfaceService{
    private final AirportRepository airportRepository;

    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    @Override
    public List<Airport> getAllAirport() {
        return airportRepository.findAll();
    }
    @Override
    public Airport addAirport(Airport airport) {
        return airportRepository.save(airport);
    }
}
