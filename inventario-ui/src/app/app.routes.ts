import { Routes } from '@angular/router';
import { SucursalComponent } from './pages/sucursal/sucursal';

export const routes: Routes = [
    { path: '', redirectTo: 'sucursales', pathMatch: 'full' },
    { path: 'sucursales', component: SucursalComponent }
];
