import { Routes } from '@angular/router';
import { SucursalComponent } from './pages/sucursal/sucursal';
import { ProductoComponent } from './pages/producto/producto';

export const routes: Routes = [
    { path: '', redirectTo: 'productos', pathMatch: 'full' },
    { path: 'sucursales', component: SucursalComponent },
    { path: 'productos', component: ProductoComponent }
];
