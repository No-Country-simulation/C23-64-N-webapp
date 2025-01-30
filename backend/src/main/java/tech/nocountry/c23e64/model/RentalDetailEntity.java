package tech.nocountry.c23e64.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "rental_detail")
public class RentalDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "rental_id", nullable = false)
    private RentalEntity rental;

    @ManyToOne
    @JoinColumn(name = "furniture_id", nullable = false)
    private FurnitureEntity furniture;

    private Integer quantity;

    private BigDecimal subTotal;

}
