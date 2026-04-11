import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../services/sucursal.service';
import { Sucursal } from '../../models/sucursal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sucursal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sucursal.html',
  styleUrl: './sucursal.css',
})
export class SucursalComponent implements OnInit {
  sucursales: Sucursal[] = [];

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
    console.log({type, data})
  }
}