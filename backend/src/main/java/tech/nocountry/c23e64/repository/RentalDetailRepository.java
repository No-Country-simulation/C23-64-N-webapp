package tech.nocountry.c23e64.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.nocountry.c23e64.model.RentalDetailEntity;

import java.time.LocalDate;

public interface RentalDetailRepository extends JpaRepository<RentalDetailEntity, Long> {

    @Query("SELECT COALESCE(SUM(rd.quantity), 0) FROM RentalDetailEntity rd " +
           "WHERE rd.furniture.id = :furnitureId " +
           "AND rd.rental.rentalDate = :rentalDate")
    int findTotalReservedByFurnitureAndDate(@Param("furnitureId") Long furnitureId, @Param("rentalDate") LocalDate rentalDate);

}
