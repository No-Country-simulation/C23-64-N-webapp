package tech.nocountry.c23e64.service;

import org.springframework.beans.factory.annotation.Autowired;
import tech.nocountry.c23e64.dto.LoginRequest;
import tech.nocountry.c23e64.dto.LoginResponse;
import tech.nocountry.c23e64.model.User;
import tech.nocountry.c23e64.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Aquí puedes generar un token JWT si lo prefieres
        return new LoginResponse("TokenGenerado");
    }
}