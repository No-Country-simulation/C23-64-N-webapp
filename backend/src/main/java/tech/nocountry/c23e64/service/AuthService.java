package tech.nocountry.c23e64.service;

import tech.nocountry.c23e64.dto.SignInRequestDto;
import tech.nocountry.c23e64.dto.SignInResponseDto;

public interface AuthService {

    SignInResponseDto signIn(SignInRequestDto signInRequestDto);

}
