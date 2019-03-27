import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptQuickViewComponent } from './appt-quick-view.component';

describe('ApptQuickViewComponent', () => {
  let component: ApptQuickViewComponent;
  let fixture: ComponentFixture<ApptQuickViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptQuickViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptQuickViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
