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
          } catch (err) { }
          this.itemsList.push(data);
        });
      });

      this.firebaseSvc.getData()?.valueChanges({ idField: 'docid' }).subscribe(items => {
        this.itemsList = [];
        items.forEach((item2:any) => {
        const data2 = item2;
          try {
            data2.updateDate = (data2.updateDate as firebase.firestore.Timestamp).toDate();
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
    this.currentItem.instockqty--;
  }
  plusClick() {
    this.currentItem.instockqty = !this.currentItem.instockqty ? 0 : this.currentItem.instockqty;
    this.currentItem.instockqty++;
  }

  clearSearch() {
    this.searchTerm = '';
  }

}
