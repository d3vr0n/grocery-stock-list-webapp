import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedOrderListComponent } from './need-order-list.component';

describe('NeedOrderListComponent', () => {
  let component: NeedOrderListComponent;
  let fixture: ComponentFixture<NeedOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
