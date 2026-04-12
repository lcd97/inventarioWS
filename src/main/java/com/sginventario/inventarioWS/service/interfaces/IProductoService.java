package com.sginventario.inventarioWS.service.interfaces;

import java.util.List;
import com.sginventario.inventarioWS.dto.ProductoDTO;

public interface IProductoService {
    List<ProductoDTO> listar();

    ProductoDTO guardar(ProductoDTO dto);

    ProductoDTO actualizar(Integer id, ProductoDTO dto);

    ProductoDTO obtenerPorId(Integer id);

    void eliminar(Integer id);
}
