package tech.nocountry.c23e64.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.nocountry.c23e64.model.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUsername(String username);

    boolean existsByUsername(String username);

}
