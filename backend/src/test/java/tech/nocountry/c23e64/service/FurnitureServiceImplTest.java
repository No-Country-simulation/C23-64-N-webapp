package tech.nocountry.c23e64.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tech.nocountry.c23e64.dto.FurnitureCreateDto;
import tech.nocountry.c23e64.dto.FurnitureDto;
import tech.nocountry.c23e64.dto.FurnitureUpdateDto;
import tech.nocountry.c23e64.exception.DuplicateResourceException;
import tech.nocountry.c23e64.exception.ResourceNotFoundException;
import tech.nocountry.c23e64.mapper.FurnitureMapper;
import tech.nocountry.c23e64.model.CategoryEntity;
import tech.nocountry.c23e64.model.FurnitureEntity;
import tech.nocountry.c23e64.repository.CategoryRepository;
import tech.nocountry.c23e64.repository.FurnitureRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class FurnitureServiceImplTest {

    private FurnitureServiceImpl furnitureService;

    @Mock
    private FurnitureRepository furnitureRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private FurnitureMapper furnitureMapper;

    private AutoCloseable closeable;

    @BeforeEach
    public void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
        furnitureService = new FurnitureServiceImpl(furnitureRepository, categoryRepository, furnitureMapper);
    }

    @AfterEach
    public void tearDown() throws Exception {
        closeable.close();
    }

    @Test
    public void createFurniture_ShouldSaveAndReturnFurniture() {
        // Arrange
        FurnitureCreateDto createDto = new FurnitureCreateDto();
        createDto.setName("Mesa");
        createDto.setCategoryName("mesa");
        createDto.setStock(10);
        createDto.setUnitPrice(BigDecimal.valueOf(25.00));
        createDto.setDescription("Mesa para eventos");
        createDto.setImageUri("https://example.com/mesa.jpg");

        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setId(1L);
        categoryEntity.setName("mesa");

        FurnitureEntity furnitureEntity = new FurnitureEntity();
        furnitureEntity.setId(1L);
        furnitureEntity.setName("Mesa");
        furnitureEntity.setCategory(categoryEntity);

        FurnitureDto furnitureDto = new FurnitureDto();
        furnitureDto.setId(1L);
        furnitureDto.setName("Mesa");
        furnitureDto.setCategory("mesa");
        furnitureDto.setStock(10);
        furnitureDto.setUnitPrice(BigDecimal.valueOf(25.00));
        furnitureDto.setDescription("Mesa para eventos");
        furnitureDto.setImageUri("https://example.com/mesa.jpg");

        when(furnitureRepository.existsByName(anyString())).thenReturn(false);
        when(categoryRepository.findByName(anyString())).thenReturn(Optional.of(categoryEntity));
        when(furnitureMapper.toEntity(any(FurnitureCreateDto.class))).thenReturn(furnitureEntity);
        when(furnitureMapper.toDto(any(FurnitureEntity.class))).thenReturn(furnitureDto);

        // Act
        FurnitureDto result = furnitureService.createFurniture(createDto);

        // Assert
        assertNotNull(result);
        assertEquals("Mesa", result.getName());
        assertEquals("mesa", result.getCategory());
        verify(furnitureRepository).save(furnitureEntity);
    }

    @Test
    public void createFurniture_ShouldThrowException_WhenFurnitureExists() {
        // Arrange
        FurnitureCreateDto createDto = new FurnitureCreateDto();
        createDto.setName("Mesa");

        when(furnitureRepository.existsByName(anyString())).thenReturn(true);

        // Act & Assert
        DuplicateResourceException exception = assertThrows(DuplicateResourceException.class, () -> furnitureService.createFurniture(createDto));

        assertEquals("El mueble con nombre 'Mesa' ya existe.", exception.getMessage());
    }

    @Test
    public void createFurniture_ShouldThrowException_WhenCategoryDoesNotExist() {
        // Arrange
        FurnitureCreateDto createDto = new FurnitureCreateDto();
        createDto.setName("Mesa");
        createDto.setCategoryName("mesa");

        when(categoryRepository.findByName(anyString())).thenReturn(Optional.empty());

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> furnitureService.createFurniture(createDto));

        assertEquals("La categoría con nombre 'mesa' no existe", exception.getMessage());
    }

    @Test
    public void updateFurniture_ShouldUpdateAndReturnFurniture() {
        // Arrange
        FurnitureUpdateDto updateDto = new FurnitureUpdateDto();
        updateDto.setName("Mesa");
        updateDto.setCategoryName("mesa");
        updateDto.setStock(10);
        updateDto.setUnitPrice(BigDecimal.valueOf(25.00));
        updateDto.setDescription("Mesa para eventos");
        updateDto.setImageUri("https://example.com/mesa.jpg");

        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setId(1L);
        categoryEntity.setName("mesa");

        FurnitureEntity furnitureEntity = new FurnitureEntity();
        furnitureEntity.setId(1L);
        furnitureEntity.setName("Mesa");
        furnitureEntity.setCategory(categoryEntity);

        FurnitureDto furnitureDto = new FurnitureDto();
        furnitureDto.setId(1L);
        furnitureDto.setName("Mesa");
        furnitureDto.setCategory("mesa");
        furnitureDto.setStock(10);
        furnitureDto.setUnitPrice(BigDecimal.valueOf(25.00));
        furnitureDto.setDescription("Mesa para eventos");
        furnitureDto.setImageUri("https://example.com/mesa.jpg");

        when(furnitureRepository.findById(anyLong())).thenReturn(Optional.of(furnitureEntity));
        when(categoryRepository.findByName(anyString())).thenReturn(Optional.of(categoryEntity));
        when(furnitureMapper.toDto(any(FurnitureEntity.class))).thenReturn(furnitureDto);

        // Act
        FurnitureDto result = furnitureService.updateFurniture(1L, updateDto);

        // Assert
        assertNotNull(result);
        assertEquals("Mesa", result.getName());
        assertEquals("mesa", result.getCategory());
        verify(furnitureRepository).save(furnitureEntity);
    }

    @Test
    public void updateFurniture_ShouldThrowException_WhenFurnitureNotFound() {
        // Arrange
        FurnitureUpdateDto updateDto = new FurnitureUpdateDto();

        when(furnitureRepository.findById(anyLong())).thenReturn(Optional.empty());

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> furnitureService.updateFurniture(1L, updateDto));

        assertEquals("El mueble con ID 1 no existe", exception.getMessage());
    }

    @Test
    public void deleteFurniture_ShouldDeleteFurniture() {
        // Arrange
        when(furnitureRepository.existsById(anyLong())).thenReturn(true);

        // Act
        furnitureService.deleteFurniture(1L);

        // Assert
        verify(furnitureRepository).deleteById(1L);
    }

    @Test
    public void deleteFurniture_ShouldThrowException_WhenFurnitureNotFound() {
        // Arrange
        when(furnitureRepository.existsById(anyLong())).thenReturn(false);

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> furnitureService.deleteFurniture(1L));

        assertEquals("El mueble con ID 1 no existe", exception.getMessage());
    }

    @Test
    public void getAllFurniture_ShouldReturnListOfFurniture() {
        // Arrange
        FurnitureEntity furnitureEntity = new FurnitureEntity();
        furnitureEntity.setId(1L);
        furnitureEntity.setName("Mesa");

        FurnitureDto furnitureDto = new FurnitureDto();
        furnitureDto.setId(1L);
        furnitureDto.setName("Mesa");

        when(furnitureRepository.findAll()).thenReturn(List.of(furnitureEntity));
        when(furnitureMapper.toDto(any(FurnitureEntity.class))).thenReturn(furnitureDto);

        // Act
        List<FurnitureDto> result = furnitureService.getAllFurniture();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Mesa", result.getFirst().getName());
    }

    @Test
    public void getFurnitureById_ShouldReturnFurniture() {
        // Arrange
        FurnitureEntity furnitureEntity = new FurnitureEntity();
        furnitureEntity.setId(1L);
        furnitureEntity.setName("Mesa");

        FurnitureDto furnitureDto = new FurnitureDto();
        furnitureDto.setId(1L);
        furnitureDto.setName("Mesa");

        when(furnitureRepository.findById(anyLong())).thenReturn(Optional.of(furnitureEntity));
        when(furnitureMapper.toDto(any(FurnitureEntity.class))).thenReturn(furnitureDto);

        // Act
        FurnitureDto result = furnitureService.getFurnitureById(1L);

        // Assert
        assertNotNull(result);
        assertEquals("Mesa", result.getName());
    }

    @Test
    public void getFurnitureById_ShouldThrowException_WhenFurnitureNotFound() {
        // Arrange
        when(furnitureRepository.findById(anyLong())).thenReturn(Optional.empty());

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> furnitureService.getFurnitureById(1L));

        assertEquals("El mueble con ID 1 no existe", exception.getMessage());
    }
}
