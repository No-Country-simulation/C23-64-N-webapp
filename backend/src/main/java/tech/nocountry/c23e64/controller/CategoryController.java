package tech.nocountry.c23e64.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import tech.nocountry.c23e64.dto.CategoryCreateDto;
import tech.nocountry.c23e64.dto.CategoryDto;
import tech.nocountry.c23e64.service.CategoryService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // Endpoint para crear una categoría (solo accesible por ADMIN)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Solo usuarios con rol ADMIN pueden acceder
    public ResponseEntity<CategoryDto> addCategory(@RequestBody @Valid CategoryCreateDto createDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(createDto));
    }

    // Endpoint para obtener todas las categorías (accesible por todos los usuarios autenticados)
    @GetMapping
    @PreAuthorize("isAuthenticated()") // Cualquier usuario autenticado puede acceder
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }
}