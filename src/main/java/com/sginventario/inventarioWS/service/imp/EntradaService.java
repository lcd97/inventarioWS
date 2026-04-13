package com.sginventario.inventarioWS.service.imp;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sginventario.inventarioWS.dto.DetalleEntradaDTO;
import com.sginventario.inventarioWS.dto.EntradaDTO;
import com.sginventario.inventarioWS.entity.DetalleEntrada;
import com.sginventario.inventarioWS.entity.Entrada;
import com.sginventario.inventarioWS.entity.Producto;
import com.sginventario.inventarioWS.entity.Sucursal;
import com.sginventario.inventarioWS.repository.EntradaRepository;
import com.sginventario.inventarioWS.repository.ProductoRepository;
import com.sginventario.inventarioWS.repository.SucursalRepository;

import jakarta.transaction.Transactional;

@Service
public class EntradaService {

    private final EntradaRepository entradaRepository;

    private final ProductoRepository productoRepository;
    private final SucursalRepository sucursalRepository;

    public EntradaService(EntradaRepository entradaRepository, ProductoRepository productoRepository,
            SucursalRepository sucursalRepository) {
        this.entradaRepository = entradaRepository;
        this.productoRepository = productoRepository;
        this.sucursalRepository = sucursalRepository;
    }

    public List<EntradaDTO> listar() {

        List<Entrada> entradas = entradaRepository.findByActivoTrue();

        return entradas.stream().map(e -> {

            EntradaDTO dto = new EntradaDTO();
            dto.setId(e.getId());
            dto.setCodigo(e.getCodigo());
            dto.setFechaIngreso(e.getFechaIngreso());
            dto.setActivo(e.getActivo());
            dto.setSucursalId(e.getSucursal().getId());
            dto.setSucursalNombre(e.getSucursal().getNombre());

            List<DetalleEntradaDTO> detalles = e.getDetallesEntrada().stream().map(d -> {

                DetalleEntradaDTO det = new DetalleEntradaDTO();
                det.setId(d.getId());
                det.setProductoId(d.getProducto().getId());
                det.setProductoNombre(d.getProducto().getNombre());
                det.setCantidad(d.getCantidad());
                det.setPrecio(d.getPrecio());

                return det;

            }).toList();

            dto.setDetalles(detalles);

            return dto;

        }).toList();
    }

    @Transactional
    public void guardar(EntradaDTO dto) {

        Sucursal sucursal = existeSucursal(dto.getSucursalId());

        if (entradaRepository.existsByCodigoAndActivoTrue(dto.getCodigo().trim().toUpperCase()))
            throw new RuntimeException("El código de entrada ya existe");

        Entrada entrada = new Entrada();

        entrada.setCodigo(dto.getCodigo().trim().toUpperCase());
        entrada.setFechaIngreso(dto.getFechaIngreso());
        entrada.setActivo(true);
        entrada.setSucursal(sucursal);

        List<DetalleEntrada> detalles = new ArrayList<>();

        for (DetalleEntradaDTO d : dto.getDetalles()) {

            Producto producto = existeProducto(d.getProductoId());

            DetalleEntrada detalle = new DetalleEntrada();
            detalle.setProducto(producto);
            detalle.setCantidad(d.getCantidad());
            detalle.setPrecio(d.getPrecio());
            detalle.setEntrada(entrada);

            producto.setStock(producto.getStock() + d.getCantidad());

            detalles.add(detalle);
        }

        entrada.setDetallesEntrada(detalles);

        entradaRepository.save(entrada);
    }

    @Transactional
    public void eliminar(Integer id) {
        Entrada entrada = entradaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingreso de productos no encontrado"));

        for (DetalleEntrada d : entrada.getDetallesEntrada()) {
            Producto producto = d.getProducto();
            producto.setStock(producto.getStock() - d.getCantidad());
        }

        entrada.setActivo(false);

        entradaRepository.save(entrada);
    }

    private Producto existeProducto(Integer productoId) {
        return productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    private Sucursal existeSucursal(Integer sucursalId) {
        return sucursalRepository.findById(sucursalId)
                .orElseThrow(() -> new RuntimeException("Sucursal no encontrada"));
    }
}