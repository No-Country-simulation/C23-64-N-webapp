package tech.nocountry.c23e64.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.nocountry.c23e64.dto.RentalCreateDto;
import tech.nocountry.c23e64.dto.RentalDto;
import tech.nocountry.c23e64.service.RentalService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/rentals")
public class RentalController {

    private final RentalService rentalService;

    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @PostMapping
    public ResponseEntity<RentalDto> addRental(@RequestBody @Valid RentalCreateDto createDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(rentalService.createRental(createDto));
    }

    @GetMapping
    public ResponseEntity<List<RentalDto>> getAllRentals() {
        return ResponseEntity.ok(rentalService.getAllRentals());
    }

}
