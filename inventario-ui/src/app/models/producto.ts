export interface Producto{
    id?: number;
    sku: string;
    nombre: string;
    precio: number;
    stock: number;
    activo: boolean;
}

export const DEFAULT_PRODUCTO: Producto = {
  id: undefined,
  sku: '',
  nombre: '',
  precio: 0,
  stock: 0,
  activo: true
};