import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivoMainComponent } from './archivo-main.component';

describe('ArchivoMainComponent', () => {
  let component: ArchivoMainComponent;
  let fixture: ComponentFixture<ArchivoMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivoMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
