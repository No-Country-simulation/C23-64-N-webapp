package tech.nocountry.c23e64.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import tech.nocountry.c23e64.dto.ClientInfoDto;
import tech.nocountry.c23e64.model.ClientInfoEntity;

@Mapper(componentModel = "spring")
public interface ClientInfoMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "rentals", ignore = true)
    ClientInfoEntity toEntity(ClientInfoDto clientInfoDto);

    ClientInfoDto toDto(ClientInfoEntity clientInfoEntity);

}
