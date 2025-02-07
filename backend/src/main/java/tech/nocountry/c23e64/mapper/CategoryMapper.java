package tech.nocountry.c23e64.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import tech.nocountry.c23e64.dto.CategoryCreateDto;
import tech.nocountry.c23e64.dto.CategoryDto;
import tech.nocountry.c23e64.model.CategoryEntity;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryDto toDto(CategoryEntity categoryEntity);

    @Mapping(target = "id", ignore = true)
    CategoryEntity toEntity(CategoryCreateDto createDto);
}
