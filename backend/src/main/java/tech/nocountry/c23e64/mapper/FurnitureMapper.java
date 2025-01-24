package tech.nocountry.c23e64.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import tech.nocountry.c23e64.dto.FurnitureCreateDto;
import tech.nocountry.c23e64.dto.FurnitureDto;
import tech.nocountry.c23e64.model.FurnitureEntity;

@Mapper(componentModel = "spring")
public interface FurnitureMapper {

    FurnitureEntity toEntity(FurnitureCreateDto createDto);

    @Mapping(source = "category.name", target = "category")
    FurnitureDto toDto(FurnitureEntity furnitureEntity);
}
