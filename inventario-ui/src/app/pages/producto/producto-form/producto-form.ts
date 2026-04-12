import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReadonlyDirective } from '../../../shared/directives/readonly';

@Component({
  selector: 'app-producto-form',
  imports: [CommonModule,
            FormsModule,
            ReadonlyDirective
  ],
  templateUrl: './producto-form.html'
})

export class ProductoComponentForm {
  @Input() data: any={};
  @Input() mode: string = 'create';
  @Input() errors: any={};
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  save() {this.onSave.emit(this.data)}
  cancel() {this.onCancel.emit(this.data)}
}
