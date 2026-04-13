import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Entrada } from '../../../models/entrada';

@Component({ 
  selector: 'app-entrada-detalle',
  standalone: true,
  imports: [CommonModule,
            RouterModule
  ],
  templateUrl: './entrada-detalle.html',
  styleUrl: './entrada-detalle.css'
})
export class EntradaDetalleComponent implements OnInit {
  private router = inject(Router);
  entrada: Entrada | null = null;
  today: Date = new Date();

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.entrada = navigation?.extras.state?.['data'];
  
  if (navigation?.extras?.state) {
    this.entrada = navigation.extras.state['data'];
  }
  }

  ngOnInit(): void {
    if (!this.entrada) {
      console.warn('Datos no encontrados en el estado de navegación');
      this.router.navigate(['/entradas']);
    }
  }

  imprimir() {
    window.print();
  }

  get total() {
    return this.entrada?.detalles.reduce((acc, item) => acc + (item.cantidad * item.precio), 0) || 0;
  }
}
