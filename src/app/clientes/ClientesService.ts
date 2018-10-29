import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClientesService {
  clientesCollection: AngularFirestoreCollection<any>;
  clientes: Observable<any>;
  clientesDocument: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) {
    this.clientesCollection = this.afs.collection('clientes');

    this.clientes = this.clientesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    })
  }

  getData() {
    return this.clientes;
  }

  agregar(item) {
    this.clientesCollection.add(item);
  }

  modificar(item) {
    this.clientesDocument = this.afs.doc(`clientes/${item.id}`);
    this.clientesDocument.update(item);
  }
}
