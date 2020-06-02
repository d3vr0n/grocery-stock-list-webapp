import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user : any;

  constructor(private auth: AngularFireAuth, private router: Router, private firebaseSvc: FirebaseService) {

    this.auth.authState.subscribe(user => {
      window.sessionStorage.setItem('user', JSON.stringify(user));
      this.firebaseSvc.setUser(user);
      this.user = user;
      if(!!user) {
        this.user.name = this.user.displayName.split(' ')[0];
      }
    });

   }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    if(!!(<any>window).id_token) {
      const id_token = (<any>window).id_token;
      const resp = await this.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(id_token));
      this.user = resp.user;

      // redirect
      this.router.navigate(['stock-list']);
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
    const redirect_uri = window.location.origin + '/';
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: redirect_uri,
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      },
      dynamicLinkDomain: 'example.page.link'
    };
  }

}
