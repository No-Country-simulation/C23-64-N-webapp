package tech.nocountry.c23e64.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tech.nocountry.c23e64.dto.SignInRequestDto;
import tech.nocountry.c23e64.dto.SignInResponseDto;
import tech.nocountry.c23e64.dto.SignUpRequestDto;
import tech.nocountry.c23e64.dto.SignUpResponseDto;
import tech.nocountry.c23e64.service.AuthService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signin")
    public SignInResponseDto signIn(@RequestBody SignInRequestDto signInRequestDto) {
        return authService.signIn(signInRequestDto);
    }

    @PostMapping("/signup")
    public SignUpResponseDto signUp(@RequestBody SignUpRequestDto signUpRequestDto) {
        return authService.signUp(signUpRequestDto);
    }

}
