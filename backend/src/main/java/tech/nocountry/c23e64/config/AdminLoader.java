package tech.nocountry.c23e64.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import tech.nocountry.c23e64.model.UserEntity;
import tech.nocountry.c23e64.model.UserRole;
import tech.nocountry.c23e64.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class AdminLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.username}")
    private String username;
    @Value("${admin.password}")
    private String password;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUsername(username).isEmpty()) {
            UserEntity admin = UserEntity.builder()
                    .username(username)
                    .password(passwordEncoder.encode(password))
                    .userRole(UserRole.ROLE_ADMIN)
                    .build();
            userRepository.save(admin);
        }
    }
}
