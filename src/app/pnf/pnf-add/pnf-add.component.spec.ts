import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnfAddComponent } from './pnf-add.component';

describe('PnfAddComponent', () => {
  let component: PnfAddComponent;
  let fixture: ComponentFixture<PnfAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PnfAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PnfAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
