package tech.nocountry.c23e64.service;

import tech.nocountry.c23e64.dto.SignInRequestDto;
import tech.nocountry.c23e64.dto.SignInResponseDto;
import tech.nocountry.c23e64.dto.SignUpRequestDto;
import tech.nocountry.c23e64.dto.SignUpResponseDto;

public interface AuthService {

    SignInResponseDto signIn(SignInRequestDto signInRequestDto);

    SignUpResponseDto signUp(SignUpRequestDto signUpRequestDto);

}
