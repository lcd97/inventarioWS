import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './sidebar.html'
})
export class SidebarComponent {
  // Lista de opciones para mantener el HTML limpio
  menuItems = [
    { label: 'Sucursales', icon: '🏢', path: '/sucursales' },
    { label: 'Productos', icon: '📦', path: '/productos' },
    { label: 'Entradas Almacén', icon: '📝', path: '/entradas' }
  ];
}
