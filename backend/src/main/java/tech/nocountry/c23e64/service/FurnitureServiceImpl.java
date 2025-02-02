package tech.nocountry.c23e64.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
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
import tech.nocountry.c23e64.repository.RentalDetailRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class FurnitureServiceImpl implements FurnitureService {

    private final FurnitureRepository furnitureRepository;
    private final CategoryRepository categoryRepository;
    private final RentalDetailRepository rentalDetailRepository;
    private final FurnitureMapper furnitureMapper;
    private final Logger logger = LoggerFactory.getLogger(FurnitureServiceImpl.class);

    public FurnitureServiceImpl(FurnitureRepository furnitureRepository, CategoryRepository categoryRepository, RentalDetailRepository rentalDetailRepository, FurnitureMapper furnitureMapper) {
        this.furnitureRepository = furnitureRepository;
        this.categoryRepository = categoryRepository;
        this.rentalDetailRepository = rentalDetailRepository;
        this.furnitureMapper = furnitureMapper;
    }

    @Override
    public FurnitureDto createFurniture(FurnitureCreateDto createDto) {
        if (furnitureRepository.existsByName(createDto.getName())) {
            throw new DuplicateResourceException("El mueble con nombre '" + createDto.getName() + "' ya existe.");
        }

        CategoryEntity categoryEntity = categoryRepository
                .findByName(createDto.getCategoryName())
                .orElseThrow(() -> new IllegalArgumentException("La categoría con nombre '" + createDto.getCategoryName() + "' no existe"));

        FurnitureEntity furnitureEntity = furnitureMapper.toEntity(createDto);
        furnitureEntity.setCategory(categoryEntity);

        furnitureRepository.save(furnitureEntity);
        return furnitureMapper.toDto(furnitureEntity);
    }

    @Override
    public FurnitureDto updateFurniture(Long id, FurnitureUpdateDto updateDto) {
        FurnitureEntity furnitureEntity = furnitureRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El mueble con ID " + id + " no existe"));

        if (updateDto.getName() != null) {
            if (!updateDto.getName().equals(furnitureEntity.getName()) && furnitureRepository.existsByName(updateDto.getName())) {
                throw new DuplicateResourceException("El mueble con nombre '" + updateDto.getName() + "' ya existe");
            }
            furnitureEntity.setName(updateDto.getName());
        }
        if (updateDto.getCategoryName() != null) {
            CategoryEntity categoryEntity = categoryRepository
                    .findByName(updateDto.getCategoryName())
                    .orElseThrow(() -> new IllegalArgumentException("La categoría con nombre '" + updateDto.getCategoryName() + "' no existe"));
            furnitureEntity.setCategory(categoryEntity);
        }
        if (updateDto.getStock() != null) {
            furnitureEntity.setStock(updateDto.getStock());
        }
        if (updateDto.getUnitPrice() != null) {
            furnitureEntity.setUnitPrice(updateDto.getUnitPrice());
        }
        if (updateDto.getDescription() != null) {
            furnitureEntity.setDescription(updateDto.getDescription());
        }
        if (updateDto.getImageUri() != null) {
            furnitureEntity.setImageUri(updateDto.getImageUri());
        }

        furnitureRepository.save(furnitureEntity);
        return furnitureMapper.toDto(furnitureEntity);
    }

    @Override
    public FurnitureDto getFurnitureById(Long id, LocalDate date) {
        FurnitureEntity furnitureEntity = furnitureRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El mueble con ID " + id + " no existe"));

        FurnitureDto furnitureDto = furnitureMapper.toDto(furnitureEntity);

        if (date != null) {
            int reservedQuantity = rentalDetailRepository.findTotalReservedByFurnitureAndDate(furnitureEntity.getId(), date);
            int availableStock = Math.max(furnitureEntity.getStock() - reservedQuantity, 0);
            furnitureDto.setStock(availableStock);
        }

        return furnitureDto;
    }

    @Override
    public List<FurnitureDto> getAllFurniture(LocalDate date) {
        if (date == null) {
            logger.info("Getting all furniture without date");
            return furnitureRepository.findAll()
                    .stream()
                    .map(furnitureMapper::toDto).toList();
        }

        logger.info("Getting all furniture with date {}", date);
        return furnitureRepository.findAll().stream()
                .map(furniture -> {
                    int reservedQuantity = rentalDetailRepository.findTotalReservedByFurnitureAndDate(furniture.getId(), date);
                    int availableStock = Math.max(furniture.getStock() - reservedQuantity, 0);
                    FurnitureDto furnitureDto = furnitureMapper.toDto(furniture);
                    furnitureDto.setStock(availableStock);
                    return furnitureDto;
                })
                .toList();
    }

    @Override
    public void deleteFurniture(Long id) {
        if (furnitureRepository.existsById(id)) {
            furnitureRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("El mueble con ID " + id + " no existe");
        }
    }

}
