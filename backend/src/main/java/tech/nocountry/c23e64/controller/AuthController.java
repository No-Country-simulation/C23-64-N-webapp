package tech.nocountry.c23e64.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.nocountry.c23e64.dto.SignInRequestDto;
import tech.nocountry.c23e64.dto.SignInResponseDto;
import tech.nocountry.c23e64.service.AuthService;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signin")
    public SignInResponseDto signIn(@RequestBody SignInRequestDto signInRequestDto) {
        return authService.signIn(signInRequestDto);
    }

}
