import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(
    private _http: HttpClient,
    private angularFireStore: AngularFirestore
  ) {}

  addPhoto(body: any) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireStore
        .collection('photos')
        .add(body)
        .then(
          (res) => resolve(res),
          (error) => reject(error)
        );
    });
  }

  getPhotos() {
    return this.angularFireStore.collection('photos').snapshotChanges();
  }

  deletePhoto(photoData: any) {
    return this.angularFireStore
      .collection('photos')
      .doc(photoData.id)
      .delete();
  }
}
