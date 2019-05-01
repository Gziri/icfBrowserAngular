import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxViewComponent } from './box-view.component';

describe('BoxViewComponent', () => {
  let component: BoxViewComponent;
  let fixture: ComponentFixture<BoxViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
