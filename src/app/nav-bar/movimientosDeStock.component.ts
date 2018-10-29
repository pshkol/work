import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'movimientosDeStock',
  templateUrl: './movimientosDeStock.component.html',
  styleUrls: ['./movimientosDeStock.component.css']
})
export class movimientosDeStockComponent implements OnInit {

  constructor(private router: Router) {}

  @Input()
  data: any;

  ev(data) {
    switch (data) {
      case '1':
        this.router.navigate(['./movimientosDeStock/ultimoMovimiento']);
        break;
      case '2':
        this.router.navigate(['./movimientosDeStock/cargas']);
        break;
      case '3':
        this.router.navigate(['./movimientosDeStock/descargas']);
        break;
      case '4':
        this.router.navigate(['./movimientosDeStock/ingresoDeMercaderia']);
        break;
      case '5':
        this.router.navigate(['./movimientosDeStock/faltante']);
        break;
      case '6':
        this.router.navigate(['./movimientosDeStock/sobrante']);
        break;
      case '7':
        this.router.navigate(['./movimientosDeStock/recuentoDeStock']);
        break;
      case '8':
        this.router.navigate(['./movimientosDeStock/consumoInterno']);
        break;
      default:
        this.router.navigate(['./movimientosDeStock/descargas']);
    }
  }

  ngOnInit() {
    this.ev(this.data);
  }

}
