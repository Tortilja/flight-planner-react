package io.codelex.flightplanner.Services.Flight;

import io.codelex.flightplanner.Models.Airport;
import io.codelex.flightplanner.Models.Flight;
import io.codelex.flightplanner.Repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService implements FlightInterfaceService {
    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @Override
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    @Override
    public Flight getFlightById(Long id) {
        Optional<Flight> flightOptional = flightRepository.findById(id);
        return flightOptional.orElse(null);
    }

    @Override
    public Flight addFlight(Flight flight) {
        Airport fromAirport = flight.getFrom();
        Airport toAirport = flight.getTo();

        if (fromAirport.getId().equals(toAirport.getId())) {
            throw new IllegalArgumentException("Cannot create a flight from and to the same airport.");
        }
        if (isDuplicateFlight(flight)) {
            throw new IllegalArgumentException("Duplicate flight with the same details already exists.");
        }
        return flightRepository.save(flight);
    }

    public boolean isDuplicateFlight(Flight flight) {
        List<Flight> existingFlights = flightRepository.findByFromAndToAndCarrierAndDepartureTimeAndArrivalTime(
                flight.getFrom(),
                flight.getTo(),
                flight.getCarrier(),
                flight.getDepartureTime(),
                flight.getArrivalTime()
        );
        return existingFlights.size() > 0;
    }
    @Override
    public Flight updateFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    @Override
    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }

    @Override
    public void deleteAllFlights() {
        flightRepository.deleteAll();
    }

    @Override
    public List<Flight> searchFlights(String searchTerm) {
        return flightRepository.searchFlights(searchTerm);
    }
}
