package tech.nocountry.c23e64.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import tech.nocountry.c23e64.model.UserRole;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

@Service
public class JwtServiceImpl implements JwtService {

    private static final String SECRET_KEY = "super-secret-key-super-secret-key-super-secret-key";
    private static final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    @Override
    public String generateToken(UserDetails userDetails, Map<String, Object> claims) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .claims(claims)
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plus(1, ChronoUnit.DAYS)))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    @Override
    public String extractUsername(String token) {
        return parseToken(token).getSubject();
    }

    @Override
    public UserRole extractUserRole(String token) {
        String role = parseToken(token).get("role", String.class);
        return UserRole.valueOf(role);
    }

    @Override
    public boolean isTokenValid(String token) {
        final Claims claims = parseToken(token);
        final boolean isTokenExpired = claims.getExpiration().before(Date.from(Instant.now()));
        return !isTokenExpired;
    }

    private Claims parseToken(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

}
