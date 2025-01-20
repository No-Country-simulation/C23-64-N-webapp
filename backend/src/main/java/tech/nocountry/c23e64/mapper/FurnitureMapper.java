package tech.nocountry.c23e64.mapper;

import org.springframework.beans.BeanUtils;
import tech.nocountry.c23e64.dto.FurnitureCreateDto;
import tech.nocountry.c23e64.dto.FurnitureDto;
import tech.nocountry.c23e64.model.FurnitureEntity;

public class FurnitureMapper {

    public static FurnitureDto toDto(FurnitureEntity furnitureEntity) {
        FurnitureDto dto = new FurnitureDto();
        BeanUtils.copyProperties(furnitureEntity, dto);
        return dto;
    }

    public static FurnitureEntity toEntity(FurnitureCreateDto createDto) {
        FurnitureEntity entity = new FurnitureEntity();
        BeanUtils.copyProperties(createDto, entity);
        return entity;
    }
}
