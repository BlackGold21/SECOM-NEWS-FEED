import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaProyectosComponent } from './captura-proyectos.component';

describe('CapturaProyectosComponent', () => {
  let component: CapturaProyectosComponent;
  let fixture: ComponentFixture<CapturaProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
