package tech.nocountry.c23e64.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class FurnitureUpdateDto {

    @Size(max = 100, message = "El nombre del producto no puede superar los 100 caracteres")
    private String name;

    private Long categoryId;

    @PositiveOrZero(message = "El total de existencias debe ser mayor o igual a 0")
    private Integer stock;

    @Positive(message = "El precio unitario debe ser mayor a 0")
    private BigDecimal unitPrice;

    private String description;

    @Pattern(regexp = "^(http|https)://.*$", message = "La URI de la imagen debe ser una URL válida")
    private String imageUri;

}
