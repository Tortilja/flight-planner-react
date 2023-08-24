package io.codelex.flightplanner.Controllers.AdminControllers;

import io.codelex.flightplanner.Models.Airport;
import io.codelex.flightplanner.Services.Airport.AirportInterfaceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin
public class AirportController {

    private final AirportInterfaceService airportService;

    public AirportController(AirportInterfaceService airportService) {
        this.airportService = airportService;
    }


    @GetMapping("/airportList")
    public ResponseEntity<List<Airport>> getAllAirport() {
        List<Airport> airport = airportService.getAllAirport();
        return ResponseEntity.ok(airport);
    }
    @GetMapping("/airport/{id}")
    public ResponseEntity<Airport> getAirportById(@PathVariable Long id){
        Airport airport = airportService.getAirportById(id);
        if(airport == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(airport);
    }
    @PostMapping("/admin/addAirport")
    public ResponseEntity<Airport> addAirport(@RequestBody Airport airport) {
        Airport newAirport = airportService.addAirport(airport);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAirport);
    }
    @PutMapping("/admin/updateAirport/{id}")
    public ResponseEntity<Airport> updateAirport(@PathVariable Long id, @RequestBody Airport updatedAirport){
        Airport existingAirport = airportService.getAirportById(id);

        if (existingAirport == null) {
            return ResponseEntity.notFound().build();
        }

        existingAirport.setCountry(updatedAirport.getCountry());
        existingAirport.setCity(updatedAirport.getCity());
        existingAirport.setAirport(updatedAirport.getAirport());

        Airport updatedAirportData = airportService.updateAirport(existingAirport);
        return ResponseEntity.ok(updatedAirportData);
    }
    @DeleteMapping("/admin/deleteAirport/{id}")
    public ResponseEntity<Void> deleteAirport(@PathVariable Long id) {
        Airport airport = airportService.getAirportById(id);

        if (airport == null) {
            return ResponseEntity.notFound().build();
        }

        airportService.deleteAirport(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/searchAirports")
    public ResponseEntity<List<Airport>> searchAirports(@RequestParam String searchTerm) {
        List<Airport> foundAirports = airportService.searchAirports(searchTerm);
        return ResponseEntity.ok(foundAirports);
    }
}
