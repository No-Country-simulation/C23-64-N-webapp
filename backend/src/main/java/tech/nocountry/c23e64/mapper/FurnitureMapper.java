package tech.nocountry.c23e64.mapper;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import tech.nocountry.c23e64.dto.FurnitureCreateDto;
import tech.nocountry.c23e64.dto.FurnitureDto;
import tech.nocountry.c23e64.model.CategoryEntity;
import tech.nocountry.c23e64.model.FurnitureEntity;
import tech.nocountry.c23e64.repository.CategoryRepository;

@Mapper(componentModel = "spring")
public abstract class FurnitureMapper {

    @Mapping(source = "categoryId", target = "category", qualifiedByName = "mapCategory")
    @Mapping(target = "id", ignore = true)
    public abstract FurnitureEntity toEntity(FurnitureCreateDto createDto, @Context CategoryRepository categoryRepository);

    @Mapping(source = "category.name", target = "category")
    public abstract FurnitureDto toDto(FurnitureEntity furnitureEntity);

    @Named("mapCategory")
    public CategoryEntity mapCategory(Long id, @Context CategoryRepository categoryRepository) {
        return categoryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("La categoría con ID " + id + " no existe"));
    }
}
