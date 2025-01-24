package tech.nocountry.c23e64.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class FurnitureDto {
    private Long id;

    private String name;

    private String category;

    private Integer stock;

    private BigDecimal unitPrice;

    private String description;

    private String imageUri;

}
