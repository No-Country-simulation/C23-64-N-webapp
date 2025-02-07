package tech.nocountry.c23e64.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tech.nocountry.c23e64.dto.CategoryCreateDto;
import tech.nocountry.c23e64.dto.CategoryDto;
import tech.nocountry.c23e64.exception.DuplicateResourceException;
import tech.nocountry.c23e64.mapper.CategoryMapper;
import tech.nocountry.c23e64.model.CategoryEntity;
import tech.nocountry.c23e64.repository.CategoryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryDto createCategory(CategoryCreateDto createDto) {
        if (categoryRepository.existsByName((createDto.getName()))) {
            throw new DuplicateResourceException("La categoría con nombre '" + createDto.getName() + "' ya existe.");
        }

        CategoryEntity categoryEntity = categoryRepository.save(categoryMapper.toEntity(createDto));
        return categoryMapper.toDto(categoryEntity);
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toDto)
                .toList();
    }

    @Override
    public CategoryDto getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(categoryMapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("La categoría con ID " + id + " no existe."));
    }

    @Override
    public void deleteCategory(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("La categoría con ID " + id + " no existe.");
        }
    }

}

