package com.sginventario.inventarioWS.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "El SKU es requerido")
    @Size(max = 15, message = "El máximo de caracteres del campo es 15")
    private String sku;

    @NotBlank(message = "El nombre es requerido")
    @Size(max = 50, message = "El máximo de caracteres del campo es 50")
    private String nombre;

    @Size(max = 50, message = "El máximo de caracteres del campo es 50")
    private String marca;

    @Column(nullable = false)
    private Boolean activo;

    @NotNull(message = "El stock es requerido")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;
}
