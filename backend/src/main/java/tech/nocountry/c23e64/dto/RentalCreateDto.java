package tech.nocountry.c23e64.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class RentalCreateDto {

    @NotNull
    private List<RentalDetailCreateDto> rentalDetails;

    @NotNull
    private LocalDate rentalDate;

    private ClientInfoDto clientInfo;

}
