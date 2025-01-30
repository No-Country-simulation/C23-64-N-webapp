package tech.nocountry.c23e64.service;

import tech.nocountry.c23e64.dto.RentalCreateDto;
import tech.nocountry.c23e64.dto.RentalDto;

import java.util.List;

public interface RentalService {

    RentalDto createRental(RentalCreateDto createDto);

    List<RentalDto> getAllRentals();

}
