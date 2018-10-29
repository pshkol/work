import { Component, AfterContentInit, Input } from '@angular/core';
import { CargasService } from '../../../services/CargasService';

@Component({
  selector: 'descargas',
  templateUrl: './descargas.component.html',
  styleUrls: ['./descargas.component.css']
})
export class descargasComponent implements AfterContentInit {

  cargas: Array<Object>;
  liguidadasF: Array<Object>;
  id: any;

  @Input()
  search: any;

  constructor(private CargasService: CargasService) {
    CargasService.getData().subscribe(data => {
      this.cargas = data;

      localStorage.setItem('cargas', JSON.stringify(this.cargas));

      this.liguidadasF = this.cargas.filter(item => {
        if (item['liquidadas'] == false) {
          return item;
        }
      })
    })

    this.search = 'Buscar';
    this.id = '';
  }

  ngAfterContentInit() {
    this.cargas = JSON.parse(localStorage.getItem('cargas'));
  }

  changeSearchTitle(fecha, nombres) {
    this.search = fecha + " " + nombres;
  }
}
