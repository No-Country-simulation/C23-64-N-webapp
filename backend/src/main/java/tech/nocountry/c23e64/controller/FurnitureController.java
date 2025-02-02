package tech.nocountry.c23e64.controller;

import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tech.nocountry.c23e64.dto.FurnitureCreateDto;
import tech.nocountry.c23e64.dto.FurnitureDto;
import tech.nocountry.c23e64.dto.FurnitureUpdateDto;
import tech.nocountry.c23e64.service.FurnitureService;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/furniture")
public class FurnitureController {

    private final FurnitureService furnitureService;

    public FurnitureController(FurnitureService furnitureService) {
        this.furnitureService = furnitureService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FurnitureDto> addFurniture(@RequestBody @Valid FurnitureCreateDto furniture) {
        FurnitureDto created = furnitureService.createFurniture(furniture);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping(path = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FurnitureDto> updateFurniture(@PathVariable Long id, @RequestBody @Valid FurnitureUpdateDto furniture) {
        FurnitureDto updated = furnitureService.updateFurniture(id, furniture);
        return ResponseEntity.ok(updated);
    }

    @GetMapping
    public ResponseEntity<List<FurnitureDto>> getAllFurniture(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<FurnitureDto> furnitureList = furnitureService.getAllFurniture(date);
        return ResponseEntity.ok(furnitureList);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<FurnitureDto> getFurnitureById(@PathVariable Long id, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        FurnitureDto furniture = furnitureService.getFurnitureById(id, date);
        return ResponseEntity.ok(furniture);
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteFurniture(@PathVariable Long id) {
        furnitureService.deleteFurniture(id);
        return ResponseEntity.noContent().build();
    }
}
