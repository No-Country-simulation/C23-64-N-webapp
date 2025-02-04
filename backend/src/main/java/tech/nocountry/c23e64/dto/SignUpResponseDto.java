package tech.nocountry.c23e64.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpResponseDto {

    private String username;

    private ClientInfoDto clientInfo;

}
