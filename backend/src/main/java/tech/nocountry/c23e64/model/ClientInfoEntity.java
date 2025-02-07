package tech.nocountry.c23e64.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "client_info")
public class ClientInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String dni;

    private String email;

    private String address;

    @OneToOne(mappedBy = "clientInfo")
    private UserEntity user;

    @OneToMany(mappedBy = "clientInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RentalEntity> rentals;

    public String getFullName() {
        return firstName + " " + lastName;
    }

}
