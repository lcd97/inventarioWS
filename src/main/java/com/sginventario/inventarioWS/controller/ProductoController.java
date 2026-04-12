package com.sginventario.inventarioWS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sginventario.inventarioWS.exception.ApiResponse;
import com.sginventario.inventarioWS.dto.ProductoDTO;
import com.sginventario.inventarioWS.service.imp.ProductoServiceImpl;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    @Autowired
    private ProductoServiceImpl service;

    @GetMapping
    public ApiResponse<List<ProductoDTO>> listar() {
        return new ApiResponse<>(true, "Listado", service.listar());
    }

    @GetMapping("/{id}")
    public ApiResponse<ProductoDTO> obtener(@PathVariable Integer id) {
        return new ApiResponse<>(true, "Producto encontrado", service.obtenerPorId(id));
    }

    @PostMapping
    public ApiResponse<ProductoDTO> guardar(@Valid @RequestBody ProductoDTO producto) {
        return new ApiResponse<>(true, "Producto creado correctamete", service.guardar(producto));
    }

    @PutMapping("/{id}")
    public ApiResponse<ProductoDTO> actualizar(@PathVariable Integer id, @RequestBody ProductoDTO producto) {
        return new ApiResponse<>(true, "Producto creado correctamente", service.actualizar(id, producto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> eliminar(@PathVariable Integer id) {
        service.eliminar(id);

        return new ApiResponse<Void>(true, "Producto eliminado correctamente", null);
    }
}
