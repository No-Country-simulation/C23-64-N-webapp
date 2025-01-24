package tech.nocountry.c23e64.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.nocountry.c23e64.model.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    boolean existsByName(String name);
    
}
