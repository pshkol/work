import { Component, AfterContentInit, OnInit } from '@angular/core';
import { CargasService } from '../services/CargasService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'liquidacion',
  templateUrl: './liquidacion.component.html',
  styleUrls: ['./liquidacion.component.css']
})
export class LiquidacionComponent implements AfterContentInit, OnInit {

  cargas: Array<Object>;
  id: number;

  constructor(private CargasService: CargasService, private route: ActivatedRoute) {

    this.CargasService.getData().subscribe(data => {
      this.cargas = data;
      localStorage.setItem('cargas', JSON.stringify(this.cargas));
    })

    this.route.params.subscribe(params => {
      this.id = params['id']
    });


  }

  ngAfterContentInit() {
    this.cargas = JSON.parse(localStorage.getItem('cargas'));

    console.log(this.cargas);


  }

  ngOnInit() {

  }

}
