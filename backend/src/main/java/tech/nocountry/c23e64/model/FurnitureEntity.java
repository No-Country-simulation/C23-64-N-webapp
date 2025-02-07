package tech.nocountry.c23e64.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "furniture")
public class FurnitureEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(unique = true)
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;

    @NotNull
    @PositiveOrZero
    private Integer stock;

    @NotNull
    @Positive
    private BigDecimal unitPrice;

    @NotNull
    private String description;

    @NotNull
    private String imageUri;

}
