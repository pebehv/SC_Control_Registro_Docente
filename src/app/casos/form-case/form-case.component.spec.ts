import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCaseComponent } from './form-case.component';

describe('FormCaseComponent', () => {
  let component: FormCaseComponent;
  let fixture: ComponentFixture<FormCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
