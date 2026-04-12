import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SucursalService } from '../../services/sucursal.service';
import { Sucursal } from '../../models/sucursal';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/modal/modal';
import { FormsModule } from '@angular/forms';
import { SucursalFormComponent } from './components/sucursal-form/sucursal-form';
import { SucursalTableComponent } from './components/sucursal-table/sucursal-table';
import { AlertService } from '../../services/alert';
import { ApiResponse } from '../../models/apiResponse';

@Component({
  selector: 'app-sucursal',
  standalone: true,
  imports: [CommonModule,
    ModalComponent, 
    FormsModule,
    SucursalFormComponent,
    SucursalTableComponent
  ],
  templateUrl: './sucursal.html',
  styleUrl: './sucursal.css',
})
export class SucursalComponent implements OnInit {

  private alert = inject(AlertService);

  sucursales: Sucursal[] = [];
  isModalOpen: Boolean = false;
  modalType = 'create'; 
  selectedData: any = {};
  errors: any;

  constructor(private service: SucursalService,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.service.getAll().subscribe(resp => {
      this.sucursales = resp.data
      this.cdr.detectChanges(); 
    });
  }

  showModal(type:string, data?: Sucursal){
    this.errors = {};

    this.modalType = type;
    this.selectedData = data ? { ...data } : { codigo:'', nombre: '', direccion: '', activo: true };
    
    this.isModalOpen = true;
  }

  handleSave(data: any) {
    this.errors={};

    if (this.modalType === 'create') {
      this.service.create(data).subscribe({
        next: (resp:ApiResponse<Sucursal>) => {
          if(resp.success){
            this.alert.success(resp.message);
            this.finalizarAccion();
          }else
            this.alert.error(resp.message);
        },
        error: (err) => {
          const backendError = err?.error;

          if (err?.error?.data && Object.keys(err.error.data).length > 0) {
            this.errors = err.error.data;
            this.alert.error('Error al crear el registro. Intente nuevamente o contactese con el administrador');
          }
          else if (backendError?.message)
              this.alert.error('Error al crear el registro: ' + backendError.message);
          else 
              this.alert.error('Error inesperado. Contacte al administrador.');

          this.cdr.detectChanges();
        }
      });
    } else if(this.modalType === 'edit') {
      this.service.update(data.id, data).subscribe({
        next: (resp) => {
          if(resp.success)
          {
            this.alert.success(resp.message);
            this.finalizarAccion();
          }else
            this.alert.error(resp.message);
        },
        error: (err) => this.alert.error('Error al editar. Consulte con el administrador ')
      });
    }else if(this.modalType === 'delete'){
      this.service.delete(data.id).subscribe({
        next: (resp) => {
          if (resp.success) {
            this.alert.success(resp.message);
            this.finalizarAccion();
          } else {
            this.alert.error(resp.message);
          }
        },
        error: () => this.alert.error('Error al eliminar. Consulte con el administrador')
      });
    }
  }

  private finalizarAccion() {
    this.isModalOpen = false;
    this.selectedData = {};
    this.cdr.detectChanges();
    this.listar();
  }


}