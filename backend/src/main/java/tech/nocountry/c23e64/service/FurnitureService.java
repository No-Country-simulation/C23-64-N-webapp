package tech.nocountry.c23e64.service;

import tech.nocountry.c23e64.dto.FurnitureCreateDto;
import tech.nocountry.c23e64.dto.FurnitureDto;
import tech.nocountry.c23e64.dto.FurnitureUpdateDto;

import java.util.List;

public interface FurnitureService {
    FurnitureDto createFurniture(FurnitureCreateDto createDto);

    FurnitureDto updateFurniture(Long id, FurnitureUpdateDto updateDto);

    FurnitureDto getFurnitureById(Long id);

    List<FurnitureDto> getAllFurniture();

    void deleteFurniture(Long id);
}
