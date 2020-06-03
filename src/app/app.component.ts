import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grocery-stock-list';

  user: any;

  constructor(private auth: AngularFireAuth, private router: Router, private firebaseSvc: FirebaseService, private notiSvc: NotificationsService) {

    this.auth.authState.subscribe(user => {
      console.debug('>> authstate changed > ' + user);
      window.sessionStorage.setItem('user', JSON.stringify(user));
      this.firebaseSvc.setUser(user);
      this.user = user;
      if (!!user) {
        this.user.name = this.user.displayName?.split(' ')[0];
        // redirect
        if (this.router.url.indexOf('stock-list') === -1) {
          setTimeout(() => {
            this.router.navigate(['stock-list']);
          }, 500);
        }

      }

    });

  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  handleLogOff() {
    window.sessionStorage.removeItem('user');
    return this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
