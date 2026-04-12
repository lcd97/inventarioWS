package com.sginventario.inventarioWS.service.imp;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sginventario.inventarioWS.dto.ProductoDTO;
import com.sginventario.inventarioWS.entity.Producto;
import com.sginventario.inventarioWS.repository.ProductoRepository;
import com.sginventario.inventarioWS.service.interfaces.IProductoService;
import com.sginventario.inventarioWS.exception.*;

@Service
public class ProductoServiceImpl implements IProductoService {
    private final ProductoRepository repository;
    private final ModelMapper modelMapper;

    public ProductoServiceImpl(ProductoRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ProductoDTO> listar() {
        return repository.findAll()
                .stream()
                .map(s -> modelMapper.map(s, ProductoDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductoDTO obtenerPorId(Integer id) {
        Producto producto = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        return modelMapper.map(producto, ProductoDTO.class);
    }

    @Override
    public ProductoDTO guardar(ProductoDTO dto) {
        normalizarDatos(dto);
        validarDuplicados(dto);

        Producto producto = modelMapper.map(dto, Producto.class);
        producto.setActivo(true);

        Producto saved = repository.save(producto);

        return modelMapper.map(saved, ProductoDTO.class);
    }

    @Override
    public ProductoDTO actualizar(Integer id, ProductoDTO dto) {
        Producto producto = obtenerEntidad(id);

        normalizarDatos(dto);
        validarDuplicadosEnEdicion(dto, producto);

        producto.setSku(dto.getSku());
        producto.setNombre(dto.getNombre());
        producto.setMarca(dto.getMarca());
        producto.setPrecio(dto.getPrecio());
        producto.setActivo(dto.getActivo());
        producto.setStock(dto.getStock());

        Producto updated = repository.save(producto);

        return modelMapper.map(updated, ProductoDTO.class);
    }

    @Override
    public void eliminar(Integer id) {
        Producto producto = obtenerEntidad(id);

        repository.delete(producto);
    }

    private Producto obtenerEntidad(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Producto no encontrado"));
    }

    private void normalizarDatos(ProductoDTO dto) {
        dto.setNombre(dto.getNombre().trim().toUpperCase());
        dto.setSku(dto.getSku().trim().toUpperCase());
        dto.setMarca(dto.getMarca().trim().toUpperCase());
    }

    private void validarDuplicados(ProductoDTO dto) {
        validarNombreUnico(dto.getNombre(), dto.getMarca());
        validarSku(dto.getSku());
    }

    private void validarNombreUnico(String nombre, String marca) {
        if (repository.existsByNombreIgnoreCaseAndMarcaIgnoreCase(nombre, marca)) {
            throw new BadRequestException("Ya existe un producto con ese nombre y marca en el sistema");
        }
    }

    private void validarSku(String sku) {
        if (repository.existsBySku(sku))
            throw new BadRequestException("El SKU ya se encuentra registrado en el sistema");
    }

    private void validarDuplicadosEnEdicion(ProductoDTO dto, Producto producto) {
        validarNombreUnicoEnEdicion(dto.getNombre(), dto.getMarca(), producto.getId());
        validarSkuUnicoEnEdicion(dto.getSku(), producto.getId());
    }

    private void validarNombreUnicoEnEdicion(String nombre, String marca, Integer idActual) {
        boolean existe = repository.existsByNombreIgnoreCaseAndMarcaIgnoreCase(nombre, marca);

        if (existe) {
            Producto existente = repository.findByNombreIgnoreCase(nombre).get();

            if (!existente.getId().equals(idActual))
                throw new BadRequestException("Ya existe un producto con ese nombre y marca en el sistema");
        }
    }

    private void validarSkuUnicoEnEdicion(String sku, Integer idActual) {
        Boolean existe = repository.existsBySku(sku);

        if (existe) {
            Producto existente = repository.findBySku(sku).get();

            if (!existente.getId().equals(idActual))
                throw new BadRequestException("El SKU ya se encuentra registrado en el sistema");
        }
    }
}
