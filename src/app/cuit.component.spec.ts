import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuitComponent } from './cuit.component';

describe('CuitComponent', () => {
  let component: CuitComponent;
  let fixture: ComponentFixture<CuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
