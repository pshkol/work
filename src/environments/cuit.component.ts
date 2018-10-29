import { Component, AfterContentInit } from '@angular/core';
import { CuitService } from '../services/CuitService';

@Component({
  selector: 'cuit',
  templateUrl: './cuit.component.html',
  styleUrls: ['./cuit.component.css']
})
export class CuitComponent implements AfterContentInit {
  cuits: any;
  modificando: any;

  constructor(private cuit: CuitService) {
    this.modificando = false;
    this.cuit.getData().subscribe(data => {
      this.cuits = data;
      localStorage.setItem('cuit', JSON.stringify(this.cuits));
    })
  }

  ngAfterContentInit() {
    this.cuits = JSON.parse(localStorage.getItem('cuit'));
  }

  cambiarModification(item) {
    this.modificando = item;
  }

  agregar(rs, cuit, direccion) {
    this.cuit.agregar({cuit: cuit, direccion: direccion, rs: rs});
  }

  modificar(item) {
    this.cuit.modificar(item);
    this.modificando = false;
  }
}
