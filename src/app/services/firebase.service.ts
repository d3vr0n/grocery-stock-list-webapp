import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { StockItem } from '../interface/StockItem.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  items: AngularFirestoreCollection<StockItem>;

  constructor(private db: AngularFirestore) {
    this.items = db.collection<StockItem>('StockItems');
  }

  addItem(item: any) {
    this.items.add(item);
  }

  getData() {
    return this.items;
  }

}
