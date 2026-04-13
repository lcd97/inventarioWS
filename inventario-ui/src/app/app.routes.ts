import { Routes } from '@angular/router';
import { SucursalComponent } from './pages/sucursal/sucursal';
import { ProductoComponent } from './pages/producto/producto';
import { EntradaComponent } from './pages/entrada/entrada';
import { EntradaComponentForm } from './pages/entrada/entrada-form/entrada-form';
import { EntradaDetalleComponent } from './pages/entrada/entrada-detalle/entrada-detalle';

export const routes: Routes = [
    { path: '', redirectTo: 'entradas', pathMatch: 'full' },
    { path: 'sucursales', component: SucursalComponent },
    { path: 'productos', component: ProductoComponent },
    { path: 'entradas', component: EntradaComponent },
    { path: 'entradas/nuevo', component: EntradaComponentForm },
    { path: 'entradas/detalle/:id', component: EntradaDetalleComponent }
];
