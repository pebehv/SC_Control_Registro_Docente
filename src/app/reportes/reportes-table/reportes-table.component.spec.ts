import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesTableComponent } from './reportes-table.component';

describe('ReportesTableComponent', () => {
  let component: ReportesTableComponent;
  let fixture: ComponentFixture<ReportesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
