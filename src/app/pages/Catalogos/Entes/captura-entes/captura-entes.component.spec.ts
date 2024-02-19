import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaEntesComponent } from './captura-entes.component';

describe('CapturaEntesComponent', () => {
  let component: CapturaEntesComponent;
  let fixture: ComponentFixture<CapturaEntesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaEntesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaEntesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
