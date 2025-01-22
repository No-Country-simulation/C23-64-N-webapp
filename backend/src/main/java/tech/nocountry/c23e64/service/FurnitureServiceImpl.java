package tech.nocountry.c23e64.service;

import org.springframework.stereotype.Service;
import tech.nocountry.c23e64.dto.FurnitureCreateDto;
import tech.nocountry.c23e64.dto.FurnitureDto;
import tech.nocountry.c23e64.dto.FurnitureUpdateDto;
import tech.nocountry.c23e64.exception.DuplicateResourceException;
import tech.nocountry.c23e64.exception.ResourceNotFoundException;
import tech.nocountry.c23e64.mapper.FurnitureMapper;
import tech.nocountry.c23e64.model.FurnitureEntity;
import tech.nocountry.c23e64.repository.FurnitureRepository;

import java.util.List;

@Service
public class FurnitureServiceImpl implements FurnitureService {

    private final FurnitureRepository furnitureRepository;

    public FurnitureServiceImpl(FurnitureRepository furnitureRepository) {
        this.furnitureRepository = furnitureRepository;
    }

    @Override
    public FurnitureDto createFurniture(FurnitureCreateDto createDto) {
        if (furnitureRepository.existsByName(createDto.getName())) {
            throw new DuplicateResourceException("El mueble con nombre '" + createDto.getName() + "' ya existe.");
        }

        FurnitureEntity furnitureEntity = furnitureRepository.save(FurnitureMapper.toEntity(createDto));
        return FurnitureMapper.toDto(furnitureEntity);
    }

    @Override
    public FurnitureDto updateFurniture(Long id, FurnitureUpdateDto updateDto) {
        FurnitureEntity furnitureEntity = furnitureRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("El mueble con ID " + id + " no existe"));

        if (updateDto.getName() != null && !furnitureEntity.getName().equals(updateDto.getName())
                && furnitureRepository.existsByName(updateDto.getName())) {
            throw new DuplicateResourceException("El mueble con nombre '" + updateDto.getName() + "' ya existe");
        }
        if (updateDto.getName() != null) {
            furnitureEntity.setName(updateDto.getName());
        }
        if (updateDto.getCategory() != null) {
            furnitureEntity.setCategory(updateDto.getCategory());
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
        return FurnitureMapper.toDto(furnitureEntity);
    }

    @Override
    public FurnitureDto getFurnitureById(Long id) {
        FurnitureEntity furnitureEntity = furnitureRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("El mueble con ID " + id + " no existe"));

        return FurnitureMapper.toDto(furnitureEntity);
    }

    @Override
    public List<FurnitureDto> getAllFurniture() {
        return furnitureRepository.findAll()
                .stream()
                .map(FurnitureMapper::toDto).toList();
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
