import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { movimientosDeStockComponent } from './movimientosDeStock/movimientosDeStock.component';
import { cargasComponent } from './movimientosDeStock/cargas/cargas.component';
import { consumoInternoComponent } from './movimientosDeStock/consumoInterno/consumoInterno.component';
import { descargasComponent } from './movimientosDeStock/descargas/descargas.component';
import { faltanteComponent } from './movimientosDeStock/faltante/faltante.component';
import { ingresoDeMercaderiaComponent } from './movimientosDeStock/ingresoDeMercaderia/ingresoDeMercaderia.component';
import { recuentoDeStockComponent } from './movimientosDeStock/recuentoDeStock/recuentoDeStock.component';
import { sobranteComponent } from './movimientosDeStock/sobrante/sobrante.component';
import { ultimoMovimientoComponent } from './movimientosDeStock/ultimoMovimiento/ultimoMovimiento.component';

const routes = [
  {
    path: 'movimientosDeStock',
    component: movimientosDeStockComponent,
    children: [
      {
        path: 'cargas',
        component: cargasComponent
      },
      {
        path: 'consumoInterno',
        component: consumoInternoComponent
      },
      {
        path: 'descargas',
        component: descargasComponent
      },
      {
        path: 'faltante',
        component: faltanteComponent
      },
      {
        path: 'ingresoDeMercaderia',
        component: ingresoDeMercaderiaComponent
      },
      {
        path: 'recuentoDeStock',
        component: recuentoDeStockComponent
      },
      {
        path: 'sobrante',
        component: sobranteComponent
      },
      {
        path: 'ultimoMovimiento',
        component: ultimoMovimientoComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'movimientosDeStock/cargas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    movimientosDeStockComponent,
    cargasComponent,
    consumoInternoComponent,
    descargasComponent,
    faltanteComponent,
    ingresoDeMercaderiaComponent,
    recuentoDeStockComponent,
    sobranteComponent,
    ultimoMovimientoComponent
  ],
})
export class StockModule {}
