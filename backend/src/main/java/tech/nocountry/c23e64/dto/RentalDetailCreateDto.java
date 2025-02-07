package tech.nocountry.c23e64.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class RentalDetailCreateDto {

    @NotNull
    private Long furnitureId;

    @NotNull
    @Positive
    private Integer quantity;

}
