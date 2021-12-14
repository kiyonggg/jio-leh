import { Injectable } from '@angular/core';
import { ItemRequest } from '../models/itemRequest';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { finalize } from 'rxjs/operators';
import { ItemRequestStatusEnum } from '../models/enums/ItemRequestStatusEnum';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
  ) { }

  createRequest(request, file: File) {
    return new Promise((resolve, reject) => {
      const userId = JSON.parse(sessionStorage.currentUser).uid;
      const filePath = `itemRequestImage/${userId}_${new Date()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              console.log('url', url)
              if (url) {
                request.image = url;
                request.userRequested = userId;
                request.status = ItemRequestStatusEnum.PENDING;
                this.afs.collection("requests").add(request).then(res => {
                  this.afs.doc("requests/" + res.id).update({
                    id: res.id
                  }).then(result => {
                    resolve(true);
                  })
                  // resolve(true);
                }, error => {
                  reject(error);
                })
              }
            });
          })
        )
        .subscribe(res => {
        });
    })
  }

  getAllPendingRequests() {
    return new Promise((resolve, reject) => {
      this.afs.collection('requests', ref => ref.where('status', '==', 'PENDING')).valueChanges().subscribe(requests => {
        resolve(requests);
      })
    })
  }

  acceptRequest(requestId: string) {
    return new Promise((resolve, reject) => {
      this.afs.doc("requests/" + requestId).set({
        status: ItemRequestStatusEnum.ACCEPTED,
        userAccepted: JSON.parse(sessionStorage.currentUser).uid,
      }).then(res => {
        resolve(res);
      })
    })
  }

  getUserByUserId(userId: string) {
    return new Promise((resolve, reject) => {
      this.afs.collection("users").doc(userId).get().subscribe(user => {
        if (user) {
          resolve(user.data());
        } else {
          reject(false);
        }
      })
    })
  }
}
