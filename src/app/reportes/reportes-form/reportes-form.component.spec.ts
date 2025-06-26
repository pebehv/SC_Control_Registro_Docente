import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesFormComponent } from './reportes-form.component';

describe('ReportesFormComponent', () => {
  let component: ReportesFormComponent;
  let fixture: ComponentFixture<ReportesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
