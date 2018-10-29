import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PendientesService {
  PendCollection: AngularFirestoreCollection<any>;
  Pend: Observable<any>;
  PendDocument: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) {
    this.PendCollection = this.afs.collection('pendientes');

    this.Pend = this.afs.collection('pendientes').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    })
  }

  getData() {
    return this.Pend;
  }

	agregarPendiente(comentario, direccion, pedido, cajas, plata, id = '') {
    if (id) {
      this.PendCollection.doc(id).set({comentario: comentario, direccion: direccion, pedido: pedido, cajas: cajas, plata: plata, id: id, entregado: false });
    } else {
      this.PendCollection.add({comentario: comentario, direccion: direccion, pedido: pedido, cajas: cajas, plata: plata, id: id, entregado: false})
      .then((docRef) => {
        docRef.update({id: docRef.id});
      })
    }
	}

  eliminarPendientePorId(id, pendientes) {
    pendientes.forEach(item => {
      if (item.id == id) {
        this.PendCollection.doc(id).delete();
        pendientes.splice(pendientes.indexOf(item), 1);
      }
    })
  }
}
