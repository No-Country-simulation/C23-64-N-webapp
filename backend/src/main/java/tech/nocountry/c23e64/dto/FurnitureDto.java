package tech.nocountry.c23e64.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class FurnitureDto {
    private Long id;

    private String name;

    private String category;

    private Integer stock;

    private BigDecimal unitPrice;

    private String description;

    private String imageUri;

}
