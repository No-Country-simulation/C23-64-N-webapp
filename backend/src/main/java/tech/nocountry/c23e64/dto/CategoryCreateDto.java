package tech.nocountry.c23e64.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryCreateDto {

    @NotBlank(message = "El nombre de categoría no puede estar vacío")
    @Size(max = 100, message = "El nombre de categoría no puede superar los 100 caracteres")
    private String name;

    @NotBlank(message = "La descripción no puede estar vacía")
    private String description;

    @NotBlank(message = "La URI de la imagen no puede estar vacía")
    @Pattern(regexp = "^(http|https)://.*$", message = "La URI de la imagen debe ser una URL válida")
    private String imageUri;

}
