package tech.nocountry.c23e64.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class RentalDetailDto {

    private String furnitureName;

    private Integer quantity;

    private BigDecimal subTotal;

}
