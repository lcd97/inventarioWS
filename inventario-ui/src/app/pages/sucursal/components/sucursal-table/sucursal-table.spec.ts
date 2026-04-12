import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalTable } from './sucursal-table';

describe('SucursalTable', () => {
  let component: SucursalTable;
  let fixture: ComponentFixture<SucursalTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucursalTable],
    }).compileComponents();

    fixture = TestBed.createComponent(SucursalTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
