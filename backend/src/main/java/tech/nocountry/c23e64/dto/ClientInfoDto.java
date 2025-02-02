package tech.nocountry.c23e64.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ClientInfoDto {

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    @Pattern(regexp = "^[0-9]*$")
    private String dni;

    @NotNull
    private String address;

    @NotNull
    @Email
    private String email;

}
