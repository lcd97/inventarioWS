import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appReadonly]',
  standalone: true
})
export class ReadonlyDirective implements OnChanges {

  @Input() appReadonly: string = '';

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    const isBlocked = this.appReadonly === 'detail' || this.appReadonly === 'delete';

    if (isBlocked) {
      this.el.nativeElement.style.pointerEvents = 'none';
      this.el.nativeElement.style.opacity = '0.5';
    } else {
      this.el.nativeElement.style.pointerEvents = 'auto';
      this.el.nativeElement.style.opacity = '1';
    }
  }
}