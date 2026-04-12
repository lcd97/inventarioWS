package com.sginventario.inventarioWS.dto;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductoDTO {
    private Integer Id;

    @NotBlank(message = "El SKU es requerido")
    @Size(max = 15, message = "El máximo de caracteres del campo es 15")
    private String sku;

    @NotBlank(message = "El nombre es requerido")
    @Size(max = 50, message = "El máximo de caracteres del campo es 50")
    private String nombre;

    @Size(max = 50, message = "El máximo de caracteres del campo es 50")
    private String marca;

    @NotNull(message = "El precio es requerido")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0")
    private BigDecimal precio;

    @Column(nullable = false)
    private Boolean activo;

    @NotNull(message = "El stock es requerido")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;
}
