import { Component, OnInit } from '@angular/core';
import { StockItem } from '../interface/StockItem.interface';
import { FirebaseService } from '../services/firebase.service';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-add-edit',
  templateUrl: './stock-add-edit.component.html',
  styleUrls: ['./stock-add-edit.component.scss']
})
export class StockAddEditComponent implements OnInit {

  item = <StockItem>{ updateDate: new Date() };
  itemId: string;

  constructor(private fireStoreSvc: FirebaseService, private notiSvc: NotificationsService, private activatedRoute: ActivatedRoute) {
    this.itemId = this.activatedRoute.snapshot.params['id'];
    if (!!this.itemId) {
      this.fireStoreSvc.getData().doc(this.itemId).get().subscribe(data => {
        this.item = <StockItem>{ ...data.data(), docid: data.id };
        try {
          this.item.updateDate = (<firebase.firestore.Timestamp>this.item.updateDate).toDate();
        } catch (err) { }
      });
    }
  }

  ngOnInit() {
  }

  updateItem() {
    debugger
    console.log(this.item);
    this.item.updateDate = new Date();
    if (!this.item.docid) {
      this.fireStoreSvc.getData().add(this.item).then(t => {
        this.notiSvc.success("Successfully Added.");
      }).catch(err => {
        this.notiSvc.error("Failed to save item." + err);
      });
    } else {
      this.fireStoreSvc.getData().doc().update(this.item).then(t => {
        this.notiSvc.success("Successfully Updated.");
      }).catch(err => {
        this.notiSvc.error("Failed to save item." + err);
      });
    };

  }

}
