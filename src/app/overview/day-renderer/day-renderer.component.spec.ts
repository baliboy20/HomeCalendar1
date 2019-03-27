import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayRendererComponent } from './day-renderer.component';

describe('DayRendererComponent', () => {
  let component: DayRendererComponent;
  let fixture: ComponentFixture<DayRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
