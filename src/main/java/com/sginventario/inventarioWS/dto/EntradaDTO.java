package com.sginventario.inventarioWS.dto;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EntradaDTO {

    private Integer id;

    @NotBlank(message = "El código es requerido")
    private String codigo;

    @NotNull(message = "La fecha es requerida")
    private LocalDate fechaIngreso;

    @Column(nullable = false)
    private Boolean activo;

    @NotNull(message = "La sucursal es requerida")
    private Integer sucursalId;

    private String sucursalNombre;

    @NotEmpty(message = "Debe agregar al menos un detalle")
    private List<DetalleEntradaDTO> detalles;
}
