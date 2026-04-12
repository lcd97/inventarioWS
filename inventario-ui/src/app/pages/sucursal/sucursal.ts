import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../services/sucursal.service';
import { Sucursal } from '../../models/sucursal';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/modal/modal';
import { FormsModule } from '@angular/forms';
import { SucursalFormComponent } from './components/sucursal-form/sucursal-form';
import { SucursalTableComponent } from './components/sucursal-table/sucursal-table';

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
  sucursales: Sucursal[] = [];
  isModalOpen = false;
  modalType: string = 'create';
  selectedData: any = {};

  constructor(private service: SucursalService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.service.getAll().subscribe(resp => {
      this.sucursales = resp.data
    });
  }

  showModal(type:string, data?: Sucursal){
    this.modalType = type;
    this.selectedData = data ? { ...data } : { nombre: '', direccion: '' };
    
    this.isModalOpen = true;
  }

  handleSave(data: any) {
    console.log("fjdsjaks");

    if (this.modalType === 'create') {
      this.service.create(data).subscribe({
        next: (resp) => {
          console.log('Creado con éxito', resp);
          this.finalizarAccion();
        },
        error: (err) => console.error('Error al crear', err)
      });
    } else if(this.modalType === 'edit') {
      this.service.update(data.id, data).subscribe({
        next: (resp) => {
          console.log('Actualizado con éxito', resp);
          this.finalizarAccion();
        },
        error: (err) => console.error('Error al actualizar', err)
      });
    }
  }

  private finalizarAccion() {
    this.isModalOpen = false;
    this.listar();
    this.selectedData = {};
  }


}