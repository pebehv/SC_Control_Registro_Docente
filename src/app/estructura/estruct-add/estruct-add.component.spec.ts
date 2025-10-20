import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructAddComponent } from './estruct-add.component';

describe('EstructAddComponent', () => {
  let component: EstructAddComponent;
  let fixture: ComponentFixture<EstructAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstructAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstructAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
