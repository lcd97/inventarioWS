package com.sginventario.inventarioWS.controller;

import com.sginventario.inventarioWS.dto.SucursalDTO;
import com.sginventario.inventarioWS.service.imp.SucursalServiceImpl;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sginventario.inventarioWS.exception.ApiResponse;

import java.util.List;


@RestController
@RequestMapping("/api/sucursales")
public class SucursalController {

    @Autowired
    private SucursalServiceImpl service;
    
    @GetMapping
    public ApiResponse<List<SucursalDTO>> listar() {
        return new ApiResponse<>(true, "Listado", service.listar());
    }

    @GetMapping("/{id}")
    public ApiResponse<SucursalDTO> obtener(@PathVariable Integer id) {
        return new ApiResponse<>(true, "Sucursal encontrada", service.obtenerPorId(id));
    }

    @PostMapping
    public ApiResponse<SucursalDTO> guardar(@Valid @RequestBody SucursalDTO sucursal) {
        return new ApiResponse<>(true, "Sucursal creada", service.guardar(sucursal));
    }

    @PutMapping("/{id}")
    public ApiResponse<SucursalDTO> actualizar(@PathVariable Integer id,
                                               @Valid @RequestBody SucursalDTO sucursal) {
        sucursal.setId(id);
        return new ApiResponse<>(true, "Sucursal actualizada", service.guardar(sucursal));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> eliminar(@PathVariable Integer id) {
        service.eliminar(id);
        return new ApiResponse<>(true, "Sucursal eliminada", null);
    }
}