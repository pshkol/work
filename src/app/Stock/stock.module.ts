import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { movimientosDeStockComponent } from './movimientosDeStock/movimientosDeStock.component';

const routes = [
  {
    path: 'movimientosDeStock',
    component: movimientosDeStockComponent
  },
  {
    path: '',
    redirectTo: 'movimientosDeStock',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
    movimientosDeStockComponent
  ],
})
export class StockModule {}
