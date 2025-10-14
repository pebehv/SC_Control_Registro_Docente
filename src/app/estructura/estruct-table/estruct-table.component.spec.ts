import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructTableComponent } from './estruct-table.component';

describe('EstructTableComponent', () => {
  let component: EstructTableComponent;
  let fixture: ComponentFixture<EstructTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstructTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstructTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
