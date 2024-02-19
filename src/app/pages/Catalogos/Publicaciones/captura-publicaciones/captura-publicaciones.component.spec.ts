import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaPublicacionesComponent } from './captura-publicaciones.component';

describe('CapturaPublicacionesComponent', () => {
  let component: CapturaPublicacionesComponent;
  let fixture: ComponentFixture<CapturaPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaPublicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
