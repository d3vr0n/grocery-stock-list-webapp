import { Component, OnInit } from '@angular/core';
import { StockItem } from '../interface/StockItem.interface';
import { FirebaseService } from '../services/firebase.service';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock-add-edit',
  templateUrl: './stock-add-edit.component.html',
  styleUrls: ['./stock-add-edit.component.scss']
})
export class StockAddEditComponent implements OnInit {

  item = { updateDate: new Date() } as StockItem;
  itemId: string;

  constructor(private fireStoreSvc: FirebaseService, private notiSvc: NotificationsService, private activatedRoute: ActivatedRoute) {
    this.itemId = this.activatedRoute.snapshot.params.id;
    if (!!this.itemId) {
      this.fireStoreSvc.getData().doc(this.itemId).get().subscribe(data => {
        this.item = { ...data.data(), docid: data.id } as StockItem;
        try {
          this.item.updateDate = (this.item.updateDate as firebase.firestore.Timestamp).toDate();
        } catch (err) { }
      });
    }
  }

  ngOnInit() {
  }

  updateItem() {
    this.item.updateDate = new Date();
    try {
      if (!this.item.docid) {
        this.fireStoreSvc.getData().add(this.item).then(t => {
          this.notiSvc.success('Successfully Added.');
          const timer = setTimeout(() => {
            this.item = { updateDate: new Date() } as StockItem;
          }, 5000);
          this.notiSvc.info('Resetting Form in 5 sec.', 'Tap here to stop', {
            pauseOnHover: false
          }).click.subscribe((d) => {
            clearTimeout(timer);
          });

        }).catch(err => {
          this.notiSvc.error('Failed to add item.' + err);
        });
      } else {
        this.fireStoreSvc.getData().doc(this.item.docid).update(this.item).then(t => {
          this.notiSvc.success('Successfully Updated.', 'Tap here to go back to List').click.subscribe((t) => {
            window.history.back();
          });
        }).catch(err => {
          this.notiSvc.error('Failed to update item.' + err);
        });
      }
    } catch (err) {
      this.notiSvc.error('An error occurred', err);
    }

  }

}
