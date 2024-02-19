import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaActividadesComponent } from './captura-actividades.component';

describe('CapturaActividadesComponent', () => {
  let component: CapturaActividadesComponent;
  let fixture: ComponentFixture<CapturaActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
