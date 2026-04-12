import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {

  private toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    // Personalización con colores de Tailwind (Emerald y Red)
    customClass: {
      popup: 'rounded-xl border border-gray-100 shadow-2xl',
      title: 'text-sm font-semibold'
    }
  });

  success(msg: string) {
    this.toast.fire({ 
      icon: 'success', 
      title: msg, 
      iconColor: '#10b981' // emerald-500
    });
  }

  error(msg: string) {
    this.toast.fire({ 
      icon: 'error', 
      title: msg, 
      iconColor: '#ef4444' // red-500
    });
  }
}