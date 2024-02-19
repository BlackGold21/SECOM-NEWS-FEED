import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaUsuariosComponent } from './captura-usuarios.component';

describe('CapturaUsuariosComponent', () => {
  let component: CapturaUsuariosComponent;
  let fixture: ComponentFixture<CapturaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
