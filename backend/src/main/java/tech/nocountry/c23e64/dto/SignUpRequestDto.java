package tech.nocountry.c23e64.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignUpRequestDto {

    @NotNull(message = "La información del cliente no puede ser nula")
    private ClientInfoDto clientInfo;

    @NotNull(message = "La contraseña no puede ser nula")
    private String password;

}
