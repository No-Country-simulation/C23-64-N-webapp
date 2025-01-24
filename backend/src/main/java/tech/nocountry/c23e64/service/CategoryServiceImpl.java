package tech.nocountry.c23e64.service;

import org.springframework.stereotype.Service;
import tech.nocountry.c23e64.dto.CategoryCreateDto;
import tech.nocountry.c23e64.dto.CategoryDto;
import tech.nocountry.c23e64.exception.DuplicateResourceException;
import tech.nocountry.c23e64.mapper.CategoryMapper;
import tech.nocountry.c23e64.model.CategoryEntity;
import tech.nocountry.c23e64.repository.CategoryRepository;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

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
}

