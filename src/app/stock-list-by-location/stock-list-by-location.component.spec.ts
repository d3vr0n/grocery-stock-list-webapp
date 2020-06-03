import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListByLocationComponent } from './stock-list-by-location.component';

describe('StockListByLocationComponent', () => {
  let component: StockListByLocationComponent;
  let fixture: ComponentFixture<StockListByLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockListByLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListByLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
