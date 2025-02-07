package tech.nocountry.c23e64.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.nocountry.c23e64.model.ClientInfoEntity;

public interface ClientInfoRepository extends JpaRepository<ClientInfoEntity, Long> {
}
