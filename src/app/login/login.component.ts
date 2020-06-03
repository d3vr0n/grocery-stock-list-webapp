import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FirebaseService } from '../services/firebase.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: any;

  login = {
    email: '',
    password: ''
  };

  constructor(private auth: AngularFireAuth, private router: Router, private firebaseSvc: FirebaseService, private notiSvc: NotificationsService) {

    try {
      this.user = this.firebaseSvc.getUser();
    } catch (err) {
      this.notiSvc.error(err).click.subscribe(() => {
        this.router.navigateByUrl('/login');
      });
    }

  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    if (!!(window as any).id_token) {
      const id_token = (window as any).id_token;
      delete (window as any).id_token;
      const resp = await this.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(id_token));
      const credential = firebase.auth.GoogleAuthProvider.credential(await resp.user.getIdToken());

      this.user?.linkWithCredential(credential).then((usercred) => {
        const user = usercred.user;
        this.user = user;
        console.log('Anonymous account successfully upgraded', user);
        this.notiSvc.success('Anonymous account successfully upgraded');
      }).catch((error) => {
        console.log('Error upgrading anonymous account', error);
        this.notiSvc.error('Error upgrading anonymous account', error);
      });

      // redirect
      // this.router.navigate(['stock-list']);
    }
  }

  redirectGoogleSignIn() {

    const redirect_uri = window.location.origin + '/';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=profile%20email&access_type=online&` +
      `response_type=id_token&nonce=1234&state=state_parameter_passthrough_value&` +
      `redirect_uri=${redirect_uri}&` +
      `client_id=1019483765720-1d6pa9a2vedbq46gl34i2kh0d5b4bldk.apps.googleusercontent.com`;
    window.location.href = url;
  }

  passwordLogin() {

    this.auth.signInWithEmailAndPassword(this.login.email, this.login.password).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      this.notiSvc.error('Error login', `${errorCode} ${errorMessage}`);
    });
  }

  handleAnonymousSingIn() {
    this.auth.signInAnonymously().catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      this.notiSvc.error('Anonymous login error', `${errorCode} ${errorMessage}`);
    });
  }

}
