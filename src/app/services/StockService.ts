import { Injectable } from '@angular/core';
import { stock } from '../data/stock';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StockService {
  stockCollection: AngularFirestoreCollection<any>;
  stock: Observable<any[]>;
  stockDocument: AngularFirestoreDocument<any>;
  itemsToModify: Array<Object>;

  constructor(private afs: AngularFirestore) {
    this.stockCollection = this.afs.collection('stock');

    this.stock = this.afs.collection('stock').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    })
  }

  getData =  function() {
    return this.stock;
  }

  agregar(item) {
    this.stockCollection.add(item);
  }

  modificar(item) {
    if (item.length == 1) {
      this.stockDocument = this.afs.doc(`stock/${item.id}`);
      this.stockDocument.update(item);
    } else if (item.length > 1) {
      item.forEach(it => {
        this.stockDocument = this.afs.doc(`stock/${it.id}`);
        this.stockDocument.update(it);
      })
    }
  }

  buscarPrecioPorNombre(nombre, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].nombre == nombre) {
        return array[i].precio;
      }
    }   
  }

  subtractItems(itemAr, stock) {
    this.itemsToModify = [];

    itemAr.forEach(items => {
      items.forEach(item => {
        stock.forEach(stockItem => {
          if (stockItem.nombre == item.nombre) {
            stockItem.cantidad -= item.cantidad;
          } else {
            console.log(false);
          }
        })
      })
    }) 

    this.modificar(stock);
  }
}
