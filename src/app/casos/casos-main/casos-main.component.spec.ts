import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasosMainComponent } from './casos-main.component';

describe('CasosMainComponent', () => {
  let component: CasosMainComponent;
  let fixture: ComponentFixture<CasosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasosMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
