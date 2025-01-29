package tech.nocountry.c23e64.controller;

import tech.nocountry.c23e64.dto.LoginRequest;
import tech.nocountry.c23e64.dto.LoginResponse;
import tech.nocountry.c23e64.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }
}