import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../../../models/producto';

@Component({
  selector: 'app-entrada-form-table',
  standalone: true,
  imports: [CommonModule, 
            ReactiveFormsModule],
  templateUrl: './entrada-form-table.html'
})
export class EntradaFormComponentTable {
  @Input() parentForm!: FormGroup;
  @Input() productos: Producto[] = [];
  @Output() onRemove = new EventEmitter<number>();

  get detalles() {
    return this.parentForm.get('detalles') as FormArray;
  }

  removerProducto(index: number) {
    this.onRemove.emit(index);
  }

  calcularTotal(): number {
  return this.detalles.controls.reduce((acc, control) => {
    const cantidad = control.get('cantidad')?.value || 0;
    const precio = control.get('precio')?.value || 0;
    return acc + (cantidad * precio);
  }, 0);
}
}
