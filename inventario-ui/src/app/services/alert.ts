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
    customClass: {
      popup: 'rounded-xl border border-gray-100 shadow-2xl',
      title: 'text-sm font-semibold'
    }
  });

  warning(msg: string) {
  Swal.fire({
    title: 'Atención',
    text: msg,
    icon: 'warning',
    position: 'center',
    showConfirmButton: true,
    confirmButtonText: 'Entendido',
    confirmButtonColor: '#3b82f6',
    customClass: {
      popup: 'rounded-2xl border border-blue-50 shadow-xl',
      title: 'text-xl font-bold text-slate-800',
      confirmButton: 'rounded-lg px-6 py-2'
    }
  });
}

async confirm(title: string, text: string): Promise<boolean> {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444', // red-500
    cancelButtonColor: '#64748b',  // slate-500
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: 'rounded-2xl',
      confirmButton: 'rounded-lg px-4 py-2',
      cancelButton: 'rounded-lg px-4 py-2'
    }
  });

  return result.isConfirmed;
}

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