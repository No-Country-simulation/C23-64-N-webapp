package tech.nocountry.c23e64.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.nocountry.c23e64.model.FurnitureEntity;

public interface FurnitureRepository extends JpaRepository<FurnitureEntity, Long> {

    boolean existsByName(String name);

}
