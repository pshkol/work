import { Component, AfterContentInit } from '@angular/core';
import { StockService } from '../services/StockService';
import { PendientesService } from '../services/PendientesService';

@Component({
	selector: 'pedido',
	templateUrl: './pedido.component.html',
	styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements AfterContentInit {
	stock: Array<Object>;
	pendientes: Array<Object>;

	constructor(private StockService: StockService, private PendientesService: PendientesService) {
		this.StockService.getData().subscribe(data => {
			this.stock = data;
			localStorage.setItem('stock', JSON.stringify(this.stock));
		})

		this.PendientesService.getData().subscribe(data => {
			this.pendientes = data;
			localStorage.setItem('pendientes', JSON.stringify(this.pendientes));
		})
	}

	ngAfterContentInit() {
		this.stock = JSON.parse(localStorage.getItem('stock'));
	}

	crearPedido(comentario, direccion) {
		let nombres = document.getElementsByClassName('nombre');
		let cantidades = document.getElementsByClassName('cantidad');
		let precios = document.getElementsByClassName('precios');
		let cajas: number = 0;
		let pedido: Array<Object> = [];
		let plata: number = 0;

		for ( let i = 0; i < cantidades.length; i++) {
			if (cantidades[i]['value'] > 0) {

				pedido.push({
					nombre: nombres[i].textContent,
					cantidad: Number(cantidades[i]['value']),
					precio: Number(precios[i]['value']),
					cantidadPorCaja: this.stock[i]['cantidadPorCaja']
				});

				plata+=Number(cantidades[i]['value'])*Number(precios[i]['value']*this.stock[i]['cantidadPorCaja']);

				cajas+=Number(cantidades[i]['value']);
			}
		}
		this.PendientesService.agregarPendiente(comentario, direccion, pedido, cajas, plata);
	}
}
