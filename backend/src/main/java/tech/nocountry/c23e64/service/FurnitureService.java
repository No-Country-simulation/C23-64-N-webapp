package tech.nocountry.c23e64.service;

import tech.nocountry.c23e64.dto.FurnitureCreateDto;
import tech.nocountry.c23e64.dto.FurnitureDto;
import tech.nocountry.c23e64.dto.FurnitureUpdateDto;

import java.time.LocalDate;
import java.util.List;

public interface FurnitureService {
    FurnitureDto createFurniture(FurnitureCreateDto createDto);

    FurnitureDto updateFurniture(Long id, FurnitureUpdateDto updateDto);

    FurnitureDto getFurnitureById(Long id, LocalDate date);

    List<FurnitureDto> getAllFurniture(LocalDate date);

    void deleteFurniture(Long id);
}
