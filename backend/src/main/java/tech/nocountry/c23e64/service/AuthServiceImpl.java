package tech.nocountry.c23e64.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tech.nocountry.c23e64.dto.SignInRequestDto;
import tech.nocountry.c23e64.dto.SignInResponseDto;
import tech.nocountry.c23e64.dto.SignUpRequestDto;
import tech.nocountry.c23e64.dto.SignUpResponseDto;
import tech.nocountry.c23e64.exception.DuplicateResourceException;
import tech.nocountry.c23e64.mapper.ClientInfoMapper;
import tech.nocountry.c23e64.model.ClientInfoEntity;
import tech.nocountry.c23e64.model.UserEntity;
import tech.nocountry.c23e64.model.UserRole;
import tech.nocountry.c23e64.repository.UserRepository;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final ClientInfoMapper clientInfoMapper;

    @Override
    public SignInResponseDto signIn(SignInRequestDto signInRequestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(signInRequestDto.getUsername(), signInRequestDto.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        UserEntity userEntity = (UserEntity) authentication.getPrincipal();
        String token = jwtService.generateToken(userEntity, Map.of());

        return SignInResponseDto.builder()
                .token(token)
                .role(userEntity.getUserRole().name())
                .build();
    }

    @Override
    public SignUpResponseDto signUp(SignUpRequestDto signUpRequestDto) {
        final String username = signUpRequestDto.getClientInfo().getEmail();

        if (userRepository.existsByUsername(username)) {
            throw new DuplicateResourceException("El usuario ya existe");
        }

        ClientInfoEntity clientInfoEntity = clientInfoMapper.toEntity(signUpRequestDto.getClientInfo());
        UserEntity newUser = UserEntity.builder()
                .username(username)
                .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
                .clientInfo(clientInfoEntity)
                .userRole(UserRole.ROLE_USER)
                .build();
        userRepository.save(newUser);

        return SignUpResponseDto.builder()
                .username(username)
                .clientInfo(signUpRequestDto.getClientInfo())
                .build();
    }

}