package tech.nocountry.c23e64.config;

import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import tech.nocountry.c23e64.model.UserEntity;
import tech.nocountry.c23e64.model.UserRole;
import tech.nocountry.c23e64.repository.UserRepository;

@Component
@AllArgsConstructor
public class AdminLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUsername("admin").isEmpty()) {
            UserEntity admin = UserEntity.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .userRole(UserRole.ROLE_ADMIN)
                    .build();
            userRepository.save(admin);
        }
    }
}
