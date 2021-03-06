import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockAddEditComponent } from './stock-add-edit/stock-add-edit.component';
import { NeedOrderListComponent } from './need-order-list/need-order-list.component';
import { FirebaseService } from './services/firebase.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './searchFilter.pipe';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StockListByLocationComponent } from './stock-list-by-location/stock-list-by-location.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StockListComponent,
    StockAddEditComponent,
    NeedOrderListComponent,
    FilterPipe,
    SignUpComponent,
    StockListByLocationComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule, MatSnackBarModule,
    MDBBootstrapModule.forRoot(), SimpleNotificationsModule.forRoot({
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      clickIconToClose: true
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, AngularFireAuthModule, NgbModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
