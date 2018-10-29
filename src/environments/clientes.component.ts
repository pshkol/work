import { Component, AfterContentInit } from '@angular/core';
import { ClientesService } from '../services/ClientesService';

@Component({
  selector: 'clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements AfterContentInit {

  clientes: Array<Object>;
  modificando: any;

  constructor(private ClientesService: ClientesService) {
    this.ClientesService.getData().subscribe(data => {
      this.clientes = data;
      localStorage.setItem('clientes', JSON.stringify(this.clientes));
    })

    this.modificando = false;
  }

  ngAfterContentInit() {
    this.clientes = JSON.parse(localStorage.getItem('clientes'));
    console.log(this.clientes);
  }

  cambiarModification(item) {
    this.modificando = item;
  }

  agregar(rs, cuit, direccion) {
    this.ClientesService.agregar({cuit: cuit, direccion: direccion, rs: rs});
  }

  modificar(item) {
    this.ClientesService.modificar(item);
    this.modificando = false;
  }
}
