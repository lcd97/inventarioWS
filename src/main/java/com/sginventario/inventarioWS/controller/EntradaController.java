package com.sginventario.inventarioWS.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sginventario.inventarioWS.dto.EntradaDTO;
import com.sginventario.inventarioWS.service.imp.EntradaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/entradas")
@RequiredArgsConstructor
public class EntradaController {
    private final EntradaService entradaService;

    @PostMapping
    public ResponseEntity<?> guardar(@Valid @RequestBody EntradaDTO dto) {

        entradaService.guardar(dto);
        return ResponseEntity.ok("Entrada guardada correctamente");
    }

    @GetMapping
    public ResponseEntity<List<EntradaDTO>> listar() {

        return ResponseEntity.ok(entradaService.listar());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {

        entradaService.eliminar(id);

        return ResponseEntity.ok("Entrada eliminada correctamente");
    }
}
