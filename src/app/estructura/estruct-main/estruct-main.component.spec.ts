import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructMainComponent } from './estruct-main.component';

describe('EstructMainComponent', () => {
  let component: EstructMainComponent;
  let fixture: ComponentFixture<EstructMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstructMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstructMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
