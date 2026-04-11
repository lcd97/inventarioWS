package com.sginventario.inventarioWS.entity;

import jakarta.persistence.*;
import lombok.Data;

import jakarta.validation.constraints.*;


@Data
@Entity
public class Sucursal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message="El nombre es requerido")
    @Size(max = 150, message = "El máximo de caracteres del campo nombre es 150")
    private String nombre;

    
    @NotBlank(message="La dirección es requerida")
    @Size(max = 200, message = "El máximo de caracteres del campo nombre es 200")
    private String direccion;
}