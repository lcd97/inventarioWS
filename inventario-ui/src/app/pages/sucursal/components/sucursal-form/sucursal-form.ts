import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReadonlyDirective } from '../../../../shared/directives/readonly';

@Component({
  selector: 'app-sucursal-form',
  standalone: true,
  imports: [CommonModule,
            FormsModule,
            ReadonlyDirective],
  templateUrl: './sucursal-form.html'
})
export class SucursalFormComponent {
  @Input() data: any = {}; 
  @Input() mode: string = 'create';
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  save() { this.onSave.emit(this.data); }
  cancel() { this.onCancel.emit(); }
}
