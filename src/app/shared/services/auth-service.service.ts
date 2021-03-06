import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/User.model';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  register(user: User) {
    Swal.fire({
      icon: 'info',
      title: 'Creando cuenta....',
      text: 'Espera un poco por favor',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const userData: User = {
          ...user,
          Uid: res.user.uid,
        };
        Swal.close();
        this.saveUserData(userData);
        Swal.fire({
          icon: 'success',
          title: 'Cuenta creada con éxito',
          allowOutsideClick: false,
          timer: 1000,
        }).then(() => {
          this.router.navigateByUrl('/dashboard');
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error intentalo más tarde',
          text: err.message,
        });
      });
  }

  saveUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.Uid}`
    );
    const userData: User = {
      Uid: user.Uid,
      email: user.email,
      userName: user.userName,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  loginEmailPassword(email, password) {
    Swal.fire({
      icon: 'info',
      title: 'Iniciando Sesión....',
      text: 'Espera un poco por favor',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        Swal.close();
        this.ngZone.run(() => {
          this.router.navigateByUrl('/dashboard');
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error intentalo más tarde',
          text: error.message,
        });
      });
  }

  googleLogin() {
    return this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/dashboard');
        });
        console.log(this.userData.uid);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? true : false;
  }

  async logOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
