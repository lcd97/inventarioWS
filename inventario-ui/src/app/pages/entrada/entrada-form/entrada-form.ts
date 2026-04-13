import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { SucursalService } from '../../../services/sucursal.service';
import { Producto } from '../../../models/producto';
import { Sucursal } from '../../../models/sucursal';
import { Entrada } from '../../../models/entrada';
import { EntradaService } from '../../../services/entrada.service';
import { AlertService } from '../../../services/alert';
import { EntradaFormComponentTable } from './entrada-form-table/entrada-form-table';

@Component({
  selector: 'app-entrada-form',
  imports: [CommonModule, 
            ReactiveFormsModule, 
            RouterModule,
            EntradaFormComponentTable
          ],
  templateUrl: './entrada-form.html',
})
export class EntradaComponentForm {
  private productoService = inject(ProductoService);
  private sucursalService = inject(SucursalService);
  private entradaService = inject(EntradaService);

  productos: Producto[] = [];
  sucursales: Sucursal[] = [];

   ngOnInit(): void {
    this.cargarCatalogos();
  }

  private fb = inject(FormBuilder);
  private router = inject(Router);

  private alert = inject(AlertService);


  form = this.fb.group({
    codigo: ['', Validators.required],
    fechaIngreso: [new Date().toISOString().split('T')[0], Validators.required],
    sucursalId: [null, Validators.required],
    detalles: this.fb.array([])
  });

  get detalles() {
    return this.form.get('detalles') as FormArray;
  }

agregarProducto() {
  const detalleArray = this.detalles;
  
  if (detalleArray.length > 0) {
    const ultimaFila = detalleArray.at(detalleArray.length - 1);
    const productoSeleccionado = ultimaFila.get('productoId')?.value;

    if (!productoSeleccionado || productoSeleccionado === 'null') {
      this.alert.error('Debe seleccionar un producto en la fila actual antes de agregar otra.');
      return;
    }
  }

  const fila = this.fb.group({
    productoId: [null, Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    precio: [0, [Validators.required, Validators.min(0.01)]]
  });

  fila.get('productoId')?.valueChanges.subscribe(nuevoId => {
    if (!nuevoId) return;

    const duplicado = detalleArray.controls.some((ctrl, index) => {
      return ctrl.get('productoId')?.value == nuevoId && ctrl !== fila;
    });

    if (duplicado) {
      this.alert.error('Este producto ya ha sido agregado a la lista.');
      fila.get('productoId')?.setValue(null, { emitEvent: false });
    }
  });

  this.detalles.push(fila);
}

  cargarCatalogos() {
    this.productoService.getActivos().subscribe(resp => {
      this.productos = resp.data;
    })

    this.sucursalService.getActivos().subscribe(resp => {
      this.sucursales = resp.data
    });
  }

  removerProducto(index: number) {
    this.detalles.removeAt(index);
  }

guardar() {
  this.limpiarDetallesVacios();

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    this.alert.warning('Por favor, complete todos los campos obligatorios.');
    return;
  }

  if (this.detalles.length === 0) {
    this.alert.warning('Debe agregar al menos un producto válido.');
    return;
  }

  this.procesarGuardado();
}

private limpiarDetallesVacios() {
  for (let i = this.detalles.length - 1; i >= 0; i--) {
    const productoId = this.detalles.at(i).get('productoId')?.value;
    if (!productoId || productoId === 'null') {
      this.detalles.removeAt(i);
    }
  }
}

private procesarGuardado() {
  const formValue = this.form.getRawValue();

  const payload: Partial<Entrada> = {
    codigo: formValue.codigo!,
    fechaIngreso: formValue.fechaIngreso!,
    sucursalId: Number(formValue.sucursalId),
    detalles: formValue.detalles.map((d: any) => ({
      productoId: Number(d.productoId),
      cantidad: Number(d.cantidad),
      precio: Number(d.precio)
    }))
  };

  this.entradaService.guardar(payload as Entrada).subscribe({
    next: () => this.notificarExito(),
    error: (err) => this.alert.error(`Error al guardar: ${err}`)
  });
}

private notificarExito() {
  this.alert.success('Entrada registrada correctamente');
  this.router.navigate(['/entradas']);
}


  cancelar() {
    this.router.navigate(['/entradas']);
  }
}
