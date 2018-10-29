import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ClientesComponent } from './clientes/clientes.component';

import { StockService } from './services/StockService';
import { PendientesService } from './services/PendientesService';
import { CargasService } from './services/CargasService';
import { PedidoService } from './services/PedidoService';
import { ClientesService } from './services/ClientesService';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { StockModule } from './Stock/stock.module';
import { movimientosDeStockComponent } from "./Stock/movimientosDeStock/movimientosDeStock.component";

const appRoutes: Routes = [
  {
    path: 'modificacionDeClientes',
    component: ClientesComponent
  },
  {
    path: '',
    redirectTo: 'modificacionDeClientes',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ClientesComponent
  ],
  imports: [
    StockModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule
  ],
  providers: [StockService, ClientesService, PendientesService, CargasService, PedidoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
