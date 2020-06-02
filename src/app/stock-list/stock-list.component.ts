import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { take } from 'rxjs/operators';
import { StockItem } from '../interface/StockItem.interface';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  public itemsList = <Array<StockItem>>[];
  searchTerm = "";

  constructor(private firebaseSvc: FirebaseService) {
    this.firebaseSvc.getData()?.get().subscribe(querySnapshot => {
      querySnapshot.docs.forEach(item => {
        let data = <StockItem>{ ...item.data(), docid: item.id }; 
        try {
          data.updateDate = (<firebase.firestore.Timestamp>data.updateDate).toDate();
        } catch (err) { }
        this.itemsList.push(data);
      });
    });
  }

  ngOnInit() {
  }

  searchStock() {

  }

}
