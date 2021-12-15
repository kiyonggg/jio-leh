import { Injectable } from '@angular/core';
import { ItemRequest } from '../models/itemRequest';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { finalize } from 'rxjs/operators';
import { ItemRequestStatusEnum } from '../models/enums/ItemRequestStatusEnum';

import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  allIncompleteRequests: ItemRequest[];
  allOngoingAcceptedRequests: ItemRequest[];
  allCompletedAcceptedRequests: ItemRequest[];

  allCurrentUserCurrentRequests: ItemRequest[];
  allCurrentUserCompletedRequests: ItemRequest[];

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

  getAllRequests() {
    return new Promise((resolve, reject) => {
      this.afs.collection('requests').valueChanges().subscribe(requests => {
        const itemRequests = <ItemRequest[]>requests;
        this.allIncompleteRequests = itemRequests.filter(request => {
          return request.status === ItemRequestStatusEnum.PENDING
        });
        this.allOngoingAcceptedRequests = itemRequests.filter(request => {
          return request.status === ItemRequestStatusEnum.ACCEPTED && 
            request.userAccepted === JSON.parse(sessionStorage.currentUser).uid
        });
        this.allCompletedAcceptedRequests = itemRequests.filter(request => {
          return request.status === ItemRequestStatusEnum.DELIVERED &&
            request.userAccepted === JSON.parse(sessionStorage.currentUser).uid
        })
        this.allCurrentUserCurrentRequests = itemRequests.filter(request => {
          return (request.status === ItemRequestStatusEnum.PENDING ||
            request.status === ItemRequestStatusEnum.ACCEPTED) &&
            request.userRequested === JSON.parse(sessionStorage.currentUser).uid
        });
        this.allCurrentUserCompletedRequests = itemRequests.filter(request => {
          return request.status === ItemRequestStatusEnum.DELIVERED &&
            request.userRequested === JSON.parse(sessionStorage.currentUser).uid
        });;
        resolve(requests);
      })
    })
  }

  acceptRequest(requestId: string) {
    return new Promise((resolve, reject) => {
      this.afs.doc("requests/" + requestId).update({
        status: ItemRequestStatusEnum.ACCEPTED,
        userAccepted: JSON.parse(sessionStorage.currentUser).uid,
      }).then(res => {
        resolve(true);
      })
    })
  }

  cancelRequest(requestId: string) {
    return new Promise((resolve, reject) => {
      this.afs.doc("requests/" + requestId).update({
        status: ItemRequestStatusEnum.PENDING,
        userAccepted: firebase.firestore.FieldValue.delete(),
      }).then(res => {
        resolve(true);
      })
    })
  }

  deleteRequest(requestId) {
    return new Promise((resolve, reject) => {
      this.afs.doc("requests/" + requestId).delete().then(res => {
        resolve(true);
      })
    });
  }

  markRequestAsDelivered(requestId) {
    return new Promise((resolve, reject) => {
      this.afs.doc("requests/" + requestId).update({
        status: ItemRequestStatusEnum.DELIVERED,
      }).then(res => {
        resolve(true);
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
