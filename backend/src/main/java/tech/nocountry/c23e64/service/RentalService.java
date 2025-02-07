package tech.nocountry.c23e64.service;

import tech.nocountry.c23e64.dto.RentalCreateDto;
import tech.nocountry.c23e64.dto.RentalDto;

import java.awt.image.BufferedImage;
import java.util.List;

public interface RentalService {

    RentalDto createRental(RentalCreateDto createDto);

    List<RentalDto> getAllRentals();

    RentalDto getRentalById(Long id);

    BufferedImage getRentalQrCode(Long id);

    void deleteRental(Long id);

}
