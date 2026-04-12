import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert';
import { DEFAULT_PRODUCTO, Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { ModalComponent } from '../../shared/modal/modal';
import { FormsModule } from '@angular/forms';
import { ProductoComponentForm } from './producto-form/producto-form';
import { ProductoComponentTable } from './producto-table/producto-table';
import { ApiResponse } from '../../models/apiResponse';

@Component({
  selector: 'app-producto',
  imports: [
        ModalComponent,
        FormsModule,
        ProductoComponentForm,
        ProductoComponentTable
  ],
  standalone: true,
  templateUrl: './producto.html',
})
export class ProductoComponent implements OnInit {

  private alert = inject(AlertService);

  productos: Producto[] = [];
  isModalOpen: boolean = false;
  modalType = 'create';
  selectedData: Producto = { ...DEFAULT_PRODUCTO };
  errors: any;

  constructor(private service: ProductoService,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.getAll().subscribe(resp => {
      this.productos = resp.data;
      this.cdr.detectChanges();
    })
  }

  showModal(type:string, data?:Producto){
    this.errors={};
    this.modalType=type;
    this.selectedData=data? {... data} : {...DEFAULT_PRODUCTO }

    this.isModalOpen=true;
  }

  handleSave(data:any){
    this.errors={};

      if (this.modalType === 'create') {
          this.service.create(data).subscribe({
            next: (resp:ApiResponse<Producto>) => {
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

  private finalizarAccion(){
    this.isModalOpen=false;
    this.selectedData={... DEFAULT_PRODUCTO};
    this.cdr.detectChanges();
    this.listar();
  }
}
