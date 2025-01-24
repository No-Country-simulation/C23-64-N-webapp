package tech.nocountry.c23e64.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import tech.nocountry.c23e64.dto.CategoryCreateDto;
import tech.nocountry.c23e64.dto.CategoryDto;
import tech.nocountry.c23e64.model.CategoryEntity;
import tech.nocountry.c23e64.repository.CategoryRepository;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryDto toDto(CategoryEntity categoryEntity);

    CategoryEntity toEntity(CategoryCreateDto createDto);
}
