import { Component, AfterContentInit } from '@angular/core';
import { CargasService } from '../../../services/CargasService';

@Component({
  selector: 'cargas',
  templateUrl: './cargas.component.html',
  styleUrls: ['./cargas.component.css']
})
export class cargasComponent implements AfterContentInit {
  search: any;
  cargas: Array<Object>;
  filters: Array<String>;
  filteredCargas: Array<Object>;
  copyCargas: Array<Object>;

  constructor(private CargasService: CargasService) {
    this.search = 'Buscar';

    this.CargasService.getData().subscribe(data => {
      this.cargas = data;
      this.copyCargas = data;
      localStorage.setItem('cargas', JSON.stringify(this.cargas));
      localStorage.setItem('copyCargas', JSON.stringify(this.copyCargas));
    })

    this.filters = [];
		this.filteredCargas = [];
  }

  modifySeachStr(data) {
    this.search = data;
  }

  ngAfterContentInit() {
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
}
