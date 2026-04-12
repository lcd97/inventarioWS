package com.sginventario.inventarioWS.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Sucursal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "El código es requerido")
    @Size(max = 10, message = "El máximo de caracteres del campo nombre es 10")
    private String codigo;

    @NotBlank(message = "El nombre es requerido")
    @Size(max = 150, message = "El máximo de caracteres del campo nombre es 150")
    private String nombre;

    @NotBlank(message = "La dirección es requerida")
    @Size(max = 200, message = "El máximo de caracteres del campo nombre es 200")
    private String direccion;

    @Column(nullable = false)
    private Boolean activo;
}