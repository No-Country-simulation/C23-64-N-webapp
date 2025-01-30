package tech.nocountry.c23e64.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import tech.nocountry.c23e64.dto.RentalDetailCreateDto;
import tech.nocountry.c23e64.dto.RentalDetailDto;
import tech.nocountry.c23e64.model.RentalDetailEntity;

@Mapper(componentModel = "spring", uses = {FurnitureMapper.class})
public interface RentalDetailMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "subTotal", ignore = true)
    @Mapping(target = "rental", ignore = true)
    @Mapping(target = "furniture", ignore = true)
    RentalDetailEntity toEntity(RentalDetailCreateDto createDto);

    @Mapping(source = "furniture.name", target = "furnitureName")
    RentalDetailDto toDto(RentalDetailEntity detailEntity);

}
