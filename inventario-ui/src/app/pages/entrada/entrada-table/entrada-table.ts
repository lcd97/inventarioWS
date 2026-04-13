import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Entrada } from '../../../models/entrada';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../services/alert';
import { EntradaService } from '../../../services/entrada.service';

@Component({
  selector: 'app-entrada-table',
  imports: [CommonModule],
  templateUrl: './entrada-table.html',
  styles: ``,
})
export class EntradaComponentTable {
  @Input() entradas: Entrada[] = [];
  @Output() onRefresh = new EventEmitter<void>();
   
  private router = inject(Router);
  private alert = inject(AlertService);
  private service = inject(EntradaService);

verDetalle(entrada: Entrada) {
  this.router.navigate(['/entradas/detalle', entrada.id], { 
    state: { data: entrada } 
  });
}

  async eliminarEntrada(id: number) {
    const confirmado = await this.alert.confirm(
      '¿Estás seguro?',
      'La entrada se desactivará del sistema.'
    );

    if (confirmado) {
      this.service.eliminar(id).subscribe({
        next: (resp: string) => {
          this.alert.success(resp);
          setTimeout(() => {
                this.onRefresh.emit();
              }, 200);  
        },
        error: (err) => this.alert.error('Ha ocurrido un error al eliminar la entrada')
      });
    }
  }

  calcularTotalEntrada(entrada: Entrada): number {
  if (!entrada.detalles) return 0;
  return entrada.detalles.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);
}

}
