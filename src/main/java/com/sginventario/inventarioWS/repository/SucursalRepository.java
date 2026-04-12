package com.sginventario.inventarioWS.repository;
import com.sginventario.inventarioWS.entity.Sucursal;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SucursalRepository extends JpaRepository<Sucursal, Integer> {
    boolean existsByNombre(String nombre);

    boolean existsByCodigo(String codigo);

    boolean existsByNombreIgnoreCase(String nombre);
}