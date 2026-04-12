package com.sginventario.inventarioWS.repository;
import com.sginventario.inventarioWS.entity.Sucursal;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface SucursalRepository extends JpaRepository<Sucursal, Integer> {
    boolean existsByNombre(String nombre);

    boolean existsByCodigo(String codigo);

    boolean existsByNombreIgnoreCase(String nombre);

    Optional<Sucursal> findByNombreIgnoreCase(String nombre);
    Optional<Sucursal> findByCodigo(String codigo);

    boolean existsByNombreIgnoreCaseAndActivoTrue(String nombre);
}