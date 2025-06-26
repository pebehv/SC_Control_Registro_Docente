import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAvancesComponent } from './form-avances.component';

describe('FormAvancesComponent', () => {
  let component: FormAvancesComponent;
  let fixture: ComponentFixture<FormAvancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAvancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAvancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
