import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { StockItem } from '../interface/StockItem.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  items: AngularFirestoreCollection<StockItem>;
  user: any;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
  }

  setUser(user: any) {
    this.user = user;
    if (!user) { return; }
    this.items = this.db.collection<StockItem>(`stockitems/${user.uid}/items`);
  }

  addItem(item: any) {
    this.items.add(item);
  }

  getData() {
    this.validateFirestoreSetup();
    return this.items;
  }

  validateFirestoreSetup() {
    if (!this.user) {
      const user = this.getUser();
      if (!!user) {
        this.setUser(user);
      }
    }
  }

  getUser() {
    if (this.user) {
      return this.user;
    }
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    if (!!user) {
      return user;
    } else {
      throw new Error('sign in first');
    }
  }

}
