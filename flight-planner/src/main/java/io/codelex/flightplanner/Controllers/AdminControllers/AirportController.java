package io.codelex.flightplanner.Controllers.AdminControllers;

import io.codelex.flightplanner.Models.Airport;
import io.codelex.flightplanner.Services.Airport.AirportInterfaceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
@CrossOrigin
public class AirportController {

    private final AirportInterfaceService airportService;

    public AirportController(AirportInterfaceService airportService) {
        this.airportService = airportService;
    }


    @GetMapping("/admin/airportList")
    public ResponseEntity<List<Airport>> getAllAirport() {
        List<Airport> authors = airportService.getAllAirport();
        return ResponseEntity.ok(authors);
    }
    @PostMapping("/admin/addAirport")
    public ResponseEntity<Airport> addAirport(@RequestBody Airport airport) {
        Airport newAirport = airportService.addAirport(airport);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAirport);
    }

}
