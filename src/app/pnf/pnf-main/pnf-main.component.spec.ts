import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnfMainComponent } from './pnf-main.component';

describe('PnfMainComponent', () => {
  let component: PnfMainComponent;
  let fixture: ComponentFixture<PnfMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PnfMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PnfMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
