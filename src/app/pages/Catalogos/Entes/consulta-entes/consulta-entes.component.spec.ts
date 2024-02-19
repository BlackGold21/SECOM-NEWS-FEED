import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEntesComponent } from './consulta-entes.component';

describe('ConsultaEntesComponent', () => {
  let component: ConsultaEntesComponent;
  let fixture: ComponentFixture<ConsultaEntesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaEntesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEntesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
