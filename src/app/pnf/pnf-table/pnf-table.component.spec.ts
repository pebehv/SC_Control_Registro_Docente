import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnfTableComponent } from './pnf-table.component';

describe('PnfTableComponent', () => {
  let component: PnfTableComponent;
  let fixture: ComponentFixture<PnfTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PnfTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PnfTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
