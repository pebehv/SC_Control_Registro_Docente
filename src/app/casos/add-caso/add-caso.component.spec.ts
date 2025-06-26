import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCasoComponent } from './add-caso.component';

describe('AddCasoComponent', () => {
  let component: AddCasoComponent;
  let fixture: ComponentFixture<AddCasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCasoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
