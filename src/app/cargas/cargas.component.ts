import { Component, AfterContentInit } from '@angular/core';
import { CargasService } from '../services/CargasService';
import { StockService } from '../services/StockService';
import { PendientesService } from '../services/PendientesService';

@Component({
	selector: 'cargas',
	templateUrl: './cargas.component.html',
	styleUrls: ['./cargas.component.css']
})
export class CargasComponent implements AfterContentInit {
	cargas: Array<Object>;
	stock: Array<Object>;
	pendientes: Array<Object>;
	filters: Array<String>;
	filteredCargas: Array<Object>;
	copyCargas: Array<Object>;


	constructor(private CargasService: CargasService, private StockService: StockService, private PendientesService: PendientesService) {
		this.CargasService.getData().subscribe(data => {
			this.cargas = data;
			this.copyCargas = data;
			localStorage.setItem('copyCargas', JSON.stringify(this.copyCargas));
			localStorage.setItem('cargas', JSON.stringify(this.cargas));
		})

		this.StockService.getData().subscribe(data => {
			this.stock = data;
			localStorage.setItem('stock', JSON.stringify(this.stock));
		})

		this.PendientesService.getData().subscribe(data => {
			this.pendientes = data;
			localStorage.setItem('pendientes', JSON.stringify(this.pendientes));
		})

		this.filters = [];
		this.filteredCargas = [];
	}

	ngAfterContentInit() {
		this.pendientes = JSON.parse(localStorage.getItem('pendientes'));
		this.stock = JSON.parse(localStorage.getItem('stock'));
		this.cargas = JSON.parse(localStorage.getItem('cargas'));
		this.copyCargas = JSON.parse(localStorage.getItem('copyCargas'));
	}

	filter(el, accion) {
		if (el.classList.contains('btn-light')) {
			el.classList.remove('btn-light');
			el.classList.add('btn-primary');
			this.filters.push(accion);
		} else {
			el.classList.remove('btn-primary');
			el.classList.add('btn-light');
			
			for (let i = 0; i < this.filters.length; i++) {
				if (this.filters[i] == accion) {
					this.filters.splice(i, 1);
					break;
				}
			}
		}

		this.cargas = this.__filter(this.filters);
	}


	__filter(filters) {

		this.filteredCargas = this.copyCargas;

		this.filters.forEach(accion => {
			switch(accion) {
				case 'liquidadas':
					this.filteredCargas = this.filteredCargas.filter(el => {
						if (el['liquidadas'] == true) {
							return true;
						} else {
							return false;
						}
					})
					break;
				case 'no-liquidadas':
					this.filteredCargas = this.filteredCargas.filter(el => {
						if (el['liquidadas'] == false) {
							return true;
						} else {
							return false;
						}
					})
					break;
			}
		})
		return this.filteredCargas;
	}

	// mostrarDetalle(e) {
	// 	let h: number = 0;
	// 	let t = e.parentNode.previousElementSibling.children[0];

	// 	if (t.getAttribute('data-display') == 'false') {
	// 		h = e.parentNode.previousElementSibling.getElementsByClassName('pedidos').length * 40;
	// 		t.style.height = h+'px';
	// 		t.setAttribute('data-display', 'true');
	// 	} else {
	// 		t.style.height = '0';
	// 		t.setAttribute('data-display', 'false');
	// 	}
	// }

	// cambiarPendiente(e) {
	// 	let indexP = e.parentNode.parentNode.getElementsByClassName('indexP')[0];
	// 	let indexC = e.parentNode.parentNode.getElementsByClassName('indexC')[0];
	// 	let pedido = this.cargas[indexC.value]['carga'][indexP.value];
	// 	let cargaId = this.cargas[indexC.value]['id'];

	// 	if (e.value == 'false') {
	// 		pedido.entregado = false;
	// 		console.log(pedido);
	// 		// this.CargasService.updateCarga(cargaId, this.cargas[indexC.value]);
	// 		this.PendientesService.agregarPendiente(pedido.comentario, pedido.direccion, pedido.pedido, pedido.cajas, pedido.plata, pedido.id);
	// 	} else {
	// 		pedido.entregado = true;
	// 		console.log(pedido);
	// 		//this.CargasService.updateCarga(cargaId, this.cargas[indexC.value]);
	// 		this.PendientesService.eliminarPendientePorId(pedido.id, this.pendientes);
	// 	}

	// 	this.CargasService.updateCarga(cargaId, this.cargas[indexC.value]);
	// }
}
