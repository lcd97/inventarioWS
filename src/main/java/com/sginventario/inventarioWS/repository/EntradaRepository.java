package com.sginventario.inventarioWS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sginventario.inventarioWS.entity.Entrada;

public interface EntradaRepository extends JpaRepository<Entrada, Integer> {
    boolean existsByCodigo(String codigo);

    List<Entrada> findByActivoTrue();
}
