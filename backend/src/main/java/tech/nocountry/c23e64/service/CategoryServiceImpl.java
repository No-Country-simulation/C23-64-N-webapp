package tech.nocountry.c23e64.service;

import org.springframework.stereotype.Service;
import tech.nocountry.c23e64.model.CategoryEntity;
import tech.nocountry.c23e64.repository.CategoryRepository;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }
}

