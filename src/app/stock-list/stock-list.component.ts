import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { StockItem } from '../interface/StockItem.interface';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  public itemsList = [] as Array<StockItem>;
  searchTerm = '';
  currentItem: StockItem;

  constructor(private firebaseSvc: FirebaseService, private notiSvc: NotificationsService, private router: Router) {
    try {
      this.firebaseSvc.getData()?.get().subscribe(querySnapshot => {
        querySnapshot.docs.forEach(item => {
          const data = { ...item.data(), docid: item.id } as StockItem;
          try {
            data.updateDate = (data.updateDate as firebase.firestore.Timestamp).toDate();
            this.calculateStockScore(data);
          } catch (err) { }
          this.itemsList.push(data);
        });
      });

      // document id field gets projected in the docid field
      this.firebaseSvc.getData()?.valueChanges({ idField: 'docid' }).subscribe(items => {
        this.itemsList = [];
        items.forEach((item2: any) => {
          const data2 = item2;
          try {
            data2.updateDate = (data2.updateDate as firebase.firestore.Timestamp).toDate();
            this.calculateStockScore(data2);
          } catch (err) { }
          this.itemsList.push(data2);
        });
      });

    } catch (err) {
      this.notiSvc.error(err).click.subscribe(() => {
        this.router.navigateByUrl('/login');
      });
    }
  }

  calculateStockScore(data: StockItem) {
    switch (data.consumptionduration) {
      case 'perweek':
        let needpermonth1 = data.consumptionrate * 4;
        data.stockscore = (data.instockqty / needpermonth1) * 100;
        break;
      case 'permonth':
        let needpermonth2 = data.consumptionrate * 1;
        data.stockscore = (data.instockqty / needpermonth2) * 100;
        break;
      case 'per3month':
        let needpermonth3 = data.consumptionrate / 3;
        data.stockscore = (data.instockqty / needpermonth3) * 100;

        break;
      default:
        data.stockscore = 100;
        break;
    }

  }

  ngOnInit() {
  }

  handleItemClick(item: StockItem) {
    this.currentItem = { ...item };
  }

  handleUpdateClick() {
    this.firebaseSvc.getData().doc(this.currentItem.docid).update(this.currentItem).then(t => {
      this.notiSvc.success('Successfully Updated.');
    }).catch(err => {
      this.notiSvc.error('Failed to update item.' + err);
    });
  }
  minusClick() {
    this.currentItem.instockqty = !this.currentItem.instockqty ? 0 : this.currentItem.instockqty;
    if (this.currentItem.instockqty >= 1) {
      this.currentItem.instockqty--;
    }
  }
  plusClick() {
    this.currentItem.instockqty = !this.currentItem.instockqty ? 0 : this.currentItem.instockqty;
    if (this.currentItem.instockqty >= 999) {
      this.currentItem.instockqty++;
    }
  }

  clearSearch() {
    this.searchTerm = '';
  }

}
