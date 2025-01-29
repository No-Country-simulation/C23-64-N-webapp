package tech.nocountry.c23e64.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false, length = 50)
    @NotBlank
    @Size(max = 50)
    private String username;

    @Column(nullable = false, length = 255)
    @NotBlank
    private String passwordHash;

    @Column(nullable = false, length = 20)
    @NotBlank
    @Size(max = 20)
    private String userRole; // Roles: ADMIN, CLIENT, EMPLOYEE


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public @NotBlank @Size(max = 50) String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank @Size(max = 50) String username) {
        this.username = username;
    }

    public @NotBlank String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(@NotBlank String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public @NotBlank @Size(max = 20) String getUserRole() {
        return userRole;
    }

    public void setUserRole(@NotBlank @Size(max = 20) String userRole) {
        this.userRole = userRole;
    }
}