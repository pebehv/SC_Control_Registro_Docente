import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarCasoMainComponent } from './cerrar-caso-main.component';

describe('CerrarCasoMainComponent', () => {
  let component: CerrarCasoMainComponent;
  let fixture: ComponentFixture<CerrarCasoMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CerrarCasoMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerrarCasoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
