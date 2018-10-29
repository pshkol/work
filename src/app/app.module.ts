import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
// import { CuitComponent } from './cuit/cuit.component';
// import { PendientesComponent } from './pendientes/pendientes.component';
// import { CargasComponent } from './cargas/cargas.component';
// import { PedidoComponent } from './pedido/pedido.component';
// import { LiquidacionComponent } from './liquidacion/liquidacion.component';

import { StockService } from './services/StockService';
import { CuitService } from './services/CuitService';
import { PendientesService } from './services/PendientesService';
import { CargasService } from './services/CargasService';
import { PedidoService } from './services/PedidoService';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { StockModule } from './Stock/stock.module';
import { movimientosDeStockComponent } from "./Stock/movimientosDeStock/movimientosDeStock.component";

const appRoutes: Routes = [
  // { path: 'cuit', component: CuitComponent },
  // { path: 'pendientes', component: PendientesComponent },
	// { path: 'cargas', component: CargasComponent },
	// { path: 'crearPedido', component: PedidoComponent },
  // { path: 'liquidacion/:id', component: LiquidacionComponent },
  // { path: '', redirectTo: '/stock', pathMatch: 'full' },
  // { path: '', redirectTo: movimientosDeStockComponent, pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    // CuitComponent,
    // PendientesComponent,
		// CargasComponent,
		// PedidoComponent,
    // LiquidacionComponent
  ],
  imports: [
    StockModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule
  ],
  providers: [StockService, {provide: CuitService, useClass: CuitService}, PendientesService, CargasService, PedidoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
