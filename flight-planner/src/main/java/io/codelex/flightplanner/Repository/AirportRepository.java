package io.codelex.flightplanner.Repository;

import io.codelex.flightplanner.Models.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {
    @Query("SELECT a FROM Airport a " +
            "WHERE lower(a.country) LIKE lower(concat('%', :searchTerm, '%')) " +
            "OR lower(a.city) LIKE lower(concat('%', :searchTerm, '%')) " +
            "OR lower(a.airport) LIKE lower(concat('%', :searchTerm, '%'))")
    List<Airport> searchAirports(@Param("searchTerm") String searchTerm);

}
