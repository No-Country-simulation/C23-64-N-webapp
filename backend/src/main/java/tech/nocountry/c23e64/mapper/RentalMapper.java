package tech.nocountry.c23e64.mapper;

import org.mapstruct.Mapper;
import tech.nocountry.c23e64.dto.RentalDto;
import tech.nocountry.c23e64.model.RentalEntity;

@Mapper(componentModel = "spring", uses = {RentalDetailMapper.class, ClientInfoMapper.class})
public interface RentalMapper {

    RentalDto toDto(RentalEntity rentalEntity);

}
