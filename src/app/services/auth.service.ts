import { Injectable } from '@angular/core';

import { User } from '../models/user';

//Firebase
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,    
  ) { }

  signUp(email: string, password: string, firstName: string, lastName: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserDataForSignUp(result.user, firstName, lastName).then(res => {
          return res;
        });
      }).catch((error) => {
        return error;
      });
  }

  setUserDataForSignUp(user, firstName, lastName) {
    // Set User Data
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    let userData: User = {
      uid: user.uid,
      email: user.email,
      firstName: firstName,
      lastName: lastName,
    }
    return userRef.set(userData, {
      merge: true
    });
  }

  signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      return this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
        sessionStorage.currentUser = JSON.stringify(user.user);
        sessionStorage.isLogin = true;
        resolve(user.user);
      }, error => {
        reject(error);
      });
    })
  }

  signOut() {
    sessionStorage.currentUser = undefined;
    sessionStorage.isLogin = false;
  }
}
