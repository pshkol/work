import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CargasService {
	CargasCollection: AngularFirestoreCollection<any>;
	Cargas: Observable<any>;
	CargasDocument: AngularFirestoreDocument<any>;
	CargasArray: Array<Object>;
	cargas: any;

	constructor(private afs: AngularFirestore) {
		this.CargasCollection = this.afs.collection('cargas');

		this.Cargas = this.afs.collection('cargas').snapshotChanges().map(changes => {
      		return changes.map(a => {
		        const data = a.payload.doc.data();
		        data.id = a.payload.doc.id;
		        return data;
      		})
    	})

	}

	getData() {
		return this.Cargas;
	}

	agregarCarga(carga, nombre, fecha) {
		let cajas: number = 0;
		let plata: number = 0;

		carga.forEach(item => {
			cajas += item.cajas;
			plata += item.plata;
		})
		this.CargasCollection.add({
			nombres: nombre,
			fecha: fecha,
			carga: carga,
			cajas: cajas,
			plata: plata,
			liquidadas: false,
			tcdc: Date.now()
		});
	}

	updateCarga(cargaId, carga) {
		this.CargasCollection.doc(cargaId).update(carga);
	}
}
