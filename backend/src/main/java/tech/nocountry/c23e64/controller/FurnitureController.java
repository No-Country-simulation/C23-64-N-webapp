package tech.nocountry.c23e64.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.nocountry.c23e64.dto.FurnitureCreateDto;
import tech.nocountry.c23e64.dto.FurnitureDto;
import tech.nocountry.c23e64.dto.FurnitureUpdateDto;
import tech.nocountry.c23e64.service.FurnitureService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/furniture")
public class FurnitureController {

    private final FurnitureService furnitureService;

    public FurnitureController(FurnitureService furnitureService) {
        this.furnitureService = furnitureService;
    }

    // Endpoint para crear un mueble (solo accesible por ADMIN)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Solo usuarios con rol ADMIN pueden acceder
    public ResponseEntity<FurnitureDto> addFurniture(@RequestBody @Valid FurnitureCreateDto furniture) {
        FurnitureDto created = furnitureService.createFurniture(furniture);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Endpoint para actualizar un mueble (solo accesible por ADMIN)
    @PatchMapping(path = "/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Solo usuarios con rol ADMIN pueden acceder
    public ResponseEntity<FurnitureDto> updateFurniture(@PathVariable Long id, @RequestBody @Valid FurnitureUpdateDto furniture) {
        FurnitureDto updated = furnitureService.updateFurniture(id, furniture);
        return ResponseEntity.ok(updated);
    }

    // Endpoint para obtener todos los muebles (accesible por todos los usuarios autenticados)
    @GetMapping
    @PreAuthorize("isAuthenticated()") // Cualquier usuario autenticado puede acceder
    public ResponseEntity<List<FurnitureDto>> getAllFurniture() {
        List<FurnitureDto> furnitureList = furnitureService.getAllFurniture();
        return ResponseEntity.ok(furnitureList);
    }

    // Endpoint para obtener un mueble por ID (accesible por todos los usuarios autenticados)
    @GetMapping(path = "/{id}")
    @PreAuthorize("isAuthenticated()") // Cualquier usuario autenticado puede acceder
    public ResponseEntity<FurnitureDto> getFurnitureById(@PathVariable Long id) {
        FurnitureDto furniture = furnitureService.getFurnitureById(id);
        return ResponseEntity.ok(furniture);
    }

    // Endpoint para eliminar un mueble (solo accesible por ADMIN)
    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Solo usuarios con rol ADMIN pueden acceder
    public ResponseEntity<Void> deleteFurniture(@PathVariable Long id) {
        furnitureService.deleteFurniture(id);
        return ResponseEntity.noContent().build();
    }
}