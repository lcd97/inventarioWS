export interface DetalleEntrada {
  id?: number;
  productoId: number;
  productoNombre?: string;
  cantidad: number;
  precio: number;
}

export interface Entrada {
  id?: number;
  activo: boolean;
  codigo: string;
  fechaIngreso: string;
  sucursalId: number;
  sucursalNombre?: string;
  detalles: DetalleEntrada[];
}
