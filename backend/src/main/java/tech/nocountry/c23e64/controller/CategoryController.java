package tech.nocountry.c23e64.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping
    public ResponseEntity<CategoryDto> addCategory(@RequestBody @Valid CategoryCreateDto createDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(createDto));
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }
}
