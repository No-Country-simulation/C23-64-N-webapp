package tech.nocountry.c23e64.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import tech.nocountry.c23e64.dto.FurnitureCreateDto;
import tech.nocountry.c23e64.dto.FurnitureDto;
import tech.nocountry.c23e64.model.FurnitureEntity;

@Mapper(componentModel = "spring")
public abstract class FurnitureMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", ignore = true)
    public abstract FurnitureEntity toEntity(FurnitureCreateDto createDto);

    @Mapping(source = "category.name", target = "category")
    public abstract FurnitureDto toDto(FurnitureEntity furnitureEntity);

}
