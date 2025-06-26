import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCerrarCasoComponent } from './form-cerrar-caso.component';

describe('FormCerrarCasoComponent', () => {
  let component: FormCerrarCasoComponent;
  let fixture: ComponentFixture<FormCerrarCasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCerrarCasoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCerrarCasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
