import { Component, AfterContentInit } from '@angular/core';
import { PendientesService } from '../services/PendientesService';
import { CargasService } from '../services/CargasService';
import { StockService } from '../services/StockService';

@Component({
	selector: 'pendientes',
	templateUrl: 'pendientes.component.html',
	styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent implements AfterContentInit {
	pendientes: any;
	stock: any;
	cargaNoSave: Array<any>;
	total: any = {pedidos: 0, plata: 0, cajas: 0};
	itemsToSubtract: Array<Object>;



 	constructor (private PendService: PendientesService, private CargasService: CargasService, private StockService: StockService) {
		this.cargaNoSave = [];
		this.itemsToSubtract = [];
		this.PendService.getData().subscribe(items => {
			this.pendientes = items;
			this.pendientes.map(item => item.add = true);
			localStorage.setItem('pendientes', JSON.stringify(this.pendientes));

			this.total.pedidos = this.pendientes.length;
			this.pendientes.forEach(ped => {
				this.total.plata += ped.plata;
				this.total.cajas += ped.cajas;
			})
		});

		this.StockService.getData().subscribe(data => {
			this.stock = data;
			localStorage.setItem('stock', JSON.stringify(this.stock));
		})
	}

	ngAfterContentInit() {
		this.pendientes = JSON.parse(localStorage.getItem('pendientes'));
		this.pendientes.map(item => item.add = true);
		this.stock = JSON.parse(localStorage.getItem('stock'));
		this.total.pedidos = this.pendientes.length;
			this.pendientes.forEach(ped => {
				this.total;
				this.total.cajas += ped.cajas;
		})
	}


	crearCarga(nombre, fecha) {
		if (nombre.length == 0 || this.cargaNoSave.length == 0 || fecha.length == 0) {
			return false;
		} else {
			this.cargaNoSave.forEach(item => {
				delete item['add'];
				item['entregado'] = true;

				this.PendService.eliminarPendientePorId(item.id, this.pendientes);

			})
			this.pendientes = JSON.parse(localStorage.getItem('pendientes'));
			this.CargasService.agregarCarga(this.cargaNoSave, nombre, fecha);
			this.StockService.subtractItems(this.itemsToSubtract, this.stock);

			this.total.pedidos = this.pendientes.length;
		}
	}

	agregarCarga(item) {
		this.cargaNoSave.push(item);
		this.itemsToSubtract.push(item.pedido);

		item.add = false;
	}

	quitarCarga(item) {
		this.cargaNoSave.splice(this.cargaNoSave.indexOf(item), 1);

		item.add = true;
	}

	cambiarDetalle(e) {
		if (e.getAttribute('data-detalle') == 'false') {
			e.parentNode.nextElementSibling.style.display = "table";
			e.setAttribute('data-detalle', true);
		} else {
			e.parentNode.nextElementSibling.style.display = 'none';
			e.setAttribute('data-detalle', false);
		}
	}


}
