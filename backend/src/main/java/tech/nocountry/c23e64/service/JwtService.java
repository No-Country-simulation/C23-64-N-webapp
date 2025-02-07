package tech.nocountry.c23e64.service;

import org.springframework.security.core.userdetails.UserDetails;
import tech.nocountry.c23e64.model.UserRole;

import java.util.Map;

public interface JwtService {

    String generateToken(UserDetails userDetails, Map<String, Object> claims);

    String extractUsername(String token);

    UserRole extractUserRole(String token);

    boolean isTokenValid(String token);

}
