import { Component, AfterContentInit } from '@angular/core';
import { StockService } from '../services/StockService';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements AfterContentInit {

  data: any;
  modificando: any;

  constructor(private stock: StockService) {
    this.modificando = false;

    this.stock.getData().subscribe(items => {
      this.data = items;
      localStorage.setItem('stock', JSON.stringify(this.data));
    })
  }

  ngAfterContentInit() {
    this.data = JSON.parse(localStorage.getItem('stock'));
  }

  modificar(item) {
    console.log(this.data);
    this.stock.modificar(item);
    this.modificando = false;
    console.log(this.data);
  }

  CambiarModificacion(item) {
    this.modificando = item;
  }

  agregar (nombre, cantidad, precio, cantidadPorCaja) {
    if (nombre && cantidad) {
      this.stock.agregar({nombre: nombre, cantidad: cantidad, precio: precio, cantidadPorCaja: cantidadPorCaja});
    }
  }
}
