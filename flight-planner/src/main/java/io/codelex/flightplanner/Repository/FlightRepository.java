package io.codelex.flightplanner.Repository;

import io.codelex.flightplanner.Models.Airport;
import io.codelex.flightplanner.Models.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
@Repository
public interface FlightRepository extends JpaRepository<Flight, Long>{
    List<Flight> findByFromAndToAndCarrierAndDepartureTimeAndArrivalTime(
            Airport from,
            Airport to,
            String carrier,
            LocalDateTime departureTime,
            LocalDateTime arrivalTime
    );

    @Query("SELECT f FROM Flight f " +
            "WHERE lower(f.from.city) LIKE lower(concat('%', :searchTerm, '%')) " +
            "OR lower(f.to.city) LIKE lower(concat('%', :searchTerm, '%')) " +
            "OR lower(f.carrier) LIKE lower(concat('%', :searchTerm, '%'))")
    List<Flight> searchFlights(@Param("searchTerm") String searchTerm);

}
