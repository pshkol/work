import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CuitService {
  cuitsCollection: AngularFirestoreCollection<any>;
  cuits: Observable<any>;
  cuitsDocument: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) {
    this.cuitsCollection = this.afs.collection('cuit');

    this.cuits = this.afs.collection('cuit').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    })

  }

  getData() {
    return this.cuits;
  }

  agregar(item) {
    this.cuitsCollection.add(item);
  }

  modificar(item) {
    this.cuitsDocument = this.afs.doc(`cuit/${item.id}`);
    this.cuitsDocument.update(item);
  }
}
