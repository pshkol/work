import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class PedidoService {
	PedCollection: AngularFirestoreCollection<any>;
	Ped: Observable<any>;
	
	constructor(private afs: AngularFirestore) {
		
	}
}