package com.sginventario.inventarioWS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sginventario.inventarioWS.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {

    boolean existsByNombreIgnoreCaseAndMarcaIgnoreCase(String nombre, String marca);

    boolean existsBySku(String sku);

    Optional<Producto> findByNombreIgnoreCase(String nombre);

    Optional<Producto> findBySku(String sku);

}