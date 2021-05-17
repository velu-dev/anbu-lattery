import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
export interface Inputs {
  id: any,
  data: any
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private inputs: Observable<Inputs[]>;
  private inputCollection: AngularFirestoreCollection<Inputs>;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.inputCollection = this.afs.collection<Inputs>('inputs');
    this.inputs = this.inputCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const dd = a.payload.doc.id;
          return { dd, ...data };
        });
      })
    );
  }

  getInputs(): Observable<Inputs[]> {
    return this.inputs;
  }

  getInput(id: string): Observable<Inputs> {
    return this.inputCollection.doc<any>(id).valueChanges().pipe(
      take(1),
      map(input => {
        input.id = id;
        return input
      })
    );
  }

  addInput(input: Inputs): Promise<DocumentReference> {
    return this.inputCollection.add(input);
  }

  updateInput(input: Inputs): Promise<void> {
    return this.inputCollection.doc(input.id).update({ data: input.data });
  }

  deleteInput(id: string): Promise<void> {
    return this.inputCollection.doc(id).delete();
  }
}
