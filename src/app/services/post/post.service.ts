import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private angularFireStore: AngularFirestore) {}

  addPost(body: any) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireStore
        .collection('posts')
        .add(body)
        .then(
          (res) => resolve(res),
          (error) => reject(error)
        );
    });
  }

  getPosts() {
    return this.angularFireStore.collection('posts').snapshotChanges();
  }

  deletePost(post: any) {
    return this.angularFireStore.collection('posts').doc(post.id).delete();
  }
}
