import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDataEntryComponent } from './simple-data-entry.component';

describe('SimpleDataEntryComponent', () => {
  let component: SimpleDataEntryComponent;
  let fixture: ComponentFixture<SimpleDataEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleDataEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
