import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesMainComponent } from './reportes-main.component';

describe('ReportesMainComponent', () => {
  let component: ReportesMainComponent;
  let fixture: ComponentFixture<ReportesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
