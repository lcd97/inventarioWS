package com.sginventario.inventarioWS.service.imp;

import com.sginventario.inventarioWS.dto.SucursalDTO;
import com.sginventario.inventarioWS.entity.Sucursal;
import com.sginventario.inventarioWS.exception.BadRequestException;
import com.sginventario.inventarioWS.exception.ResourceNotFoundException;
import com.sginventario.inventarioWS.repository.SucursalRepository;
import com.sginventario.inventarioWS.service.ISucursalService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SucursalServiceImpl implements ISucursalService {
    private final SucursalRepository repository;
    private final ModelMapper modelMapper;

    public SucursalServiceImpl(SucursalRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<SucursalDTO> listar() {
        return repository.findAll()
                .stream()
                .map(s -> modelMapper.map(s, SucursalDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public SucursalDTO guardar(SucursalDTO dto) {
        normalizarDatos(dto);
        validarDuplicados(dto);

        Sucursal sucursal = modelMapper.map(dto, Sucursal.class);
        Sucursal saved = repository.save(sucursal);
        return modelMapper.map(saved, SucursalDTO.class);
    }

    @Override
    public SucursalDTO obtenerPorId(Integer id) {
        Sucursal sucursal = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sucursal no encontrada"));

        return modelMapper.map(sucursal, SucursalDTO.class);
    }   

    @Override
    public void eliminar(Integer id) {
        repository.deleteById(id);
    }

    private void validarDuplicados(SucursalDTO dto) {
        validarNombreUnico(dto.getNombre());
        validarCodigoUnico(dto.getCodigo());
    }

    private void validarNombreUnico(String nombre) {
        if (repository.existsByNombreIgnoreCase(nombre)) {
            throw new BadRequestException("El nombre ya se encuentra registrado en el sistema");
        }
    }

    private void validarCodigoUnico(String codigo) {
        if (repository.existsByCodigo(codigo)) {
            throw new BadRequestException("El código ya se encuentra registrado en el sistema");
        }
    }

    private void normalizarDatos(SucursalDTO dto) {
        dto.setNombre(dto.getNombre().trim().toUpperCase());
        dto.setCodigo(dto.getCodigo().trim().toUpperCase());

        if (dto.getDireccion() != null)
            dto.setDireccion(dto.getDireccion().trim());
    }
}