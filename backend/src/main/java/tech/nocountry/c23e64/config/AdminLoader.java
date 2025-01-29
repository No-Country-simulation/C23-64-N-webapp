package tech.nocountry.c23e64.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tech.nocountry.c23e64.model.User;
import tech.nocountry.c23e64.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class AdminLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPasswordHash(passwordEncoder.encode("admin123")); // Cambiar esto por una contraseña segura
            admin.setUserRole("ADMIN");
            userRepository.save(admin);
        }
    }
}