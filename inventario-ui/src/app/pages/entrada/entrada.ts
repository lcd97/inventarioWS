import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { EntradaService } from '../../services/entrada.service';
import { Router } from '@angular/router'
import { Entrada } from '../../models/entrada';
import { CommonModule } from '@angular/common';
import { EntradaComponentTable } from './entrada-table/entrada-table';
import { AlertService } from '../../services/alert';

@Component({
  selector: 'app-entrada',
  imports: [CommonModule,
            EntradaComponentTable
  ],
  templateUrl: './entrada.html',
})
export class EntradaComponent implements OnInit {
  entradas: Entrada[] = [];

  private alert = inject(AlertService);
  private cdr = inject(ChangeDetectorRef); 
  
  constructor(
    private service: EntradaService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEntradas();
  }

  cargarEntradas() {
    this.service.listar().subscribe({
      next: (data) => {
        this.entradas = []; 
         setTimeout(() => {
          this.entradas = [...data];
          this.cdr.markForCheck();
      }, 0);
      },
      error: (err) => {
        this.alert.error('Error al obtener el listado: ' + err);
      }
    });
  }

  irANuevo() {
    this.router.navigate(['/entradas/nuevo']);
  }

  verDetalle(id: number) {
    this.router.navigate(['/entradas/detalle', id]);
  }
}
