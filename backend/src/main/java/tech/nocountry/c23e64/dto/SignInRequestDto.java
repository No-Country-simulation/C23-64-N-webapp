package tech.nocountry.c23e64.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignInRequestDto {

    @NotNull(message = "El nombre de usuario no puede ser nulo")
    private String username;

    @NotNull(message = "La contraseña no puede ser nula")
    private String password;

}
