import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { StockItem } from '../interface/StockItem.interface';

@Component({
  selector: 'app-stock-list-by-location',
  templateUrl: './stock-list-by-location.component.html',
  styleUrls: ['./stock-list-by-location.component.scss']
})
export class StockListByLocationComponent implements OnInit {

  public itemsList = [] as Array<StockLocation>;

  constructor(private firebaseSvc: FirebaseService, private notiSvc: NotificationsService, private router: Router) {
    try {
      this.firebaseSvc.getData()?.get().subscribe(querySnapshot => {
        querySnapshot.docs.forEach(item => {
          const data = { ...item.data(), docid: item.id } as StockItem;

          const locArray = data.location.split(',');
          locArray.forEach(loc => {

            loc = loc.trim();
            let found = true;
            let itemLoc = this.itemsList.find(t => t.location === loc);
            if (!itemLoc) {
              found = false;
              itemLoc = <StockLocation>{ location: loc, items: [] };
            }
            itemLoc.items.push(data);
            if (!found) {
              this.itemsList.push(itemLoc);
            }

          });

        });
      });

    } catch (err) {
      this.notiSvc.error(err).click.subscribe(() => {
        this.router.navigateByUrl('/login');
      });
    }
  }

  ngOnInit(): void {
  }

}

class StockLocation {
  location: string;
  items: Array<StockItem>
}
