package tech.nocountry.c23e64.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tech.nocountry.c23e64.dto.CategoryCreateDto;
import tech.nocountry.c23e64.dto.CategoryDto;
import tech.nocountry.c23e64.exception.DuplicateResourceException;
import tech.nocountry.c23e64.mapper.CategoryMapper;
import tech.nocountry.c23e64.model.CategoryEntity;
import tech.nocountry.c23e64.repository.CategoryRepository;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class CategoryServiceImplTest {

    private CategoryServiceImpl categoryService;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private CategoryMapper categoryMapper;

    private AutoCloseable closeable;

    @BeforeEach
    public void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
        categoryService = new CategoryServiceImpl(categoryRepository, categoryMapper);
    }

    @AfterEach
    public void tearDown() throws Exception {
        closeable.close();
    }

    @Test
    public void createCategory_ShouldSaveAndReturnCategory() {
        // Arrange
        CategoryCreateDto createDto = new CategoryCreateDto();
        createDto.setName("mesa");

        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setId(1L);
        categoryEntity.setName("mesa");

        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(1L);
        categoryDto.setName("mesa");

        when(categoryRepository.existsByName(anyString())).thenReturn(false);
        when(categoryMapper.toEntity(createDto)).thenReturn(categoryEntity);
        when(categoryRepository.save(categoryEntity)).thenReturn(categoryEntity);
        when(categoryMapper.toDto(categoryEntity)).thenReturn(categoryDto);

        // Act
        CategoryDto result = categoryService.createCategory(createDto);

        // Assert
        assertNotNull(result);
        assertEquals("mesa", result.getName());
        assertEquals(1L, result.getId());

        verify(categoryRepository).existsByName("mesa");
        verify(categoryRepository).save(categoryEntity);
        verify(categoryMapper).toDto(categoryEntity);
    }

    @Test
    public void createCategory_ShouldThrowException_WhenCategoryAlreadyExists() {
        // Arrange
        CategoryCreateDto createDto = new CategoryCreateDto();
        createDto.setName("mesa");

        when(categoryRepository.existsByName(anyString())).thenReturn(true);

        // Act & Assert
        DuplicateResourceException exception = assertThrows(DuplicateResourceException.class, () -> categoryService.createCategory(createDto));

        assertEquals("La categoría con nombre 'mesa' ya existe.", exception.getMessage());

        verify(categoryRepository).existsByName("mesa");
        verifyNoMoreInteractions(categoryRepository);
    }

    @Test
    public void getAllCategories_ShouldReturnListOfCategories() {
        // Arrange
        CategoryEntity category1 = new CategoryEntity();
        category1.setId(1L);
        category1.setName("mesa");

        CategoryEntity category2 = new CategoryEntity();
        category2.setId(2L);
        category2.setName("silla");

        when(categoryRepository.findAll()).thenReturn(List.of(category1, category2));

        CategoryDto categoryDto1 = new CategoryDto();
        categoryDto1.setId(1L);
        categoryDto1.setName("mesa");

        CategoryDto categoryDto2 = new CategoryDto();
        categoryDto2.setId(2L);
        categoryDto2.setName("silla");

        when(categoryMapper.toDto(category1)).thenReturn(categoryDto1);
        when(categoryMapper.toDto(category2)).thenReturn(categoryDto2);

        // Act
        List<CategoryDto> result = categoryService.getAllCategories();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("mesa", result.get(0).getName());
        assertEquals("silla", result.get(1).getName());

        verify(categoryRepository).findAll();
        verify(categoryMapper).toDto(category1);
        verify(categoryMapper).toDto(category2);
    }

    @Test
    public void getCategoryById_ShouldReturnCategory_WhenIdExists() {
        // Arrange
        Long id = 1L;
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setId(id);
        categoryEntity.setName("mesa");

        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(id);
        categoryDto.setName("mesa");

        when(categoryRepository.findById(id)).thenReturn(Optional.of(categoryEntity));
        when(categoryMapper.toDto(categoryEntity)).thenReturn(categoryDto);

        // Act
        CategoryDto result = categoryService.getCategoryById(id);

        // Assert
        assertNotNull(result);
        assertEquals("mesa", result.getName());
        assertEquals(1L, result.getId());

        verify(categoryRepository).findById(id);
        verify(categoryMapper).toDto(categoryEntity);
    }

    @Test
    public void getCategoryById_ShouldThrowException_WhenIdDoesNotExist() {
        // Arrange
        Long id = 999L;
        when(categoryRepository.findById(id)).thenReturn(Optional.empty());

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> categoryService.getCategoryById(id));

        assertEquals("La categoría con ID 999 no existe.", exception.getMessage());

        verify(categoryRepository).findById(id);
        verifyNoMoreInteractions(categoryRepository);
    }
}
