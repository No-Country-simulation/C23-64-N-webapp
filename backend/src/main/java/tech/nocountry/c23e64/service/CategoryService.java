package tech.nocountry.c23e64.service;

import jakarta.validation.Valid;
import tech.nocountry.c23e64.dto.CategoryCreateDto;
import tech.nocountry.c23e64.dto.CategoryDto;

import java.util.List;

public interface CategoryService {

    CategoryDto createCategory(CategoryCreateDto createDto);

    List<CategoryDto> getAllCategories();

    CategoryDto getCategoryById(Long id);

}
