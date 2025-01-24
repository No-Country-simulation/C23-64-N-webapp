package tech.nocountry.c23e64.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class FurnitureCreateDto {

    @NotBlank(message = "El nombre del producto no puede estar vacío")
    @Size(max = 100, message = "El nombre del producto no puede superar los 100 caracteres")
    private String name;

    @NotNull(message = "La categoría de mobiliario no puede ser nula")
    private Long categoryId;

    @NotNull(message = "El total de existencias no puede ser nulo")
    @PositiveOrZero(message = "El total de existencias debe ser mayor o igual a 0")
    private Integer stock;

    @NotNull(message = "El precio unitario no puede ser nulo")
    @Positive(message = "El precio unitario debe ser mayor a 0")
    private BigDecimal unitPrice;

    @NotBlank(message = "La descripción no puede estar vacía")
    private String description;

    @NotBlank(message = "La URI de la imagen no puede estar vacía")
    @Pattern(regexp = "^(http|https)://.*$", message = "La URI de la imagen debe ser una URL válida")
    private String imageUri;

}
