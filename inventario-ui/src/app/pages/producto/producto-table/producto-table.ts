import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-producto-table',
  imports: [CommonModule],
  templateUrl: './producto-table.html',
})

export class ProductoComponentTable {
  @Input() productos: any[] = [];
  @Output() onAction = new EventEmitter<{type: string, data?: any}>();

  showModal(type: string, data?: any){
    this.onAction.emit({type, data});
  }
}
