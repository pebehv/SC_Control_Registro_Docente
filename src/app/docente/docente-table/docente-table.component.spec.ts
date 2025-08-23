import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteTableComponent } from './docente-table.component';

describe('DocenteTableComponent', () => {
  let component: DocenteTableComponent;
  let fixture: ComponentFixture<DocenteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocenteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
