import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadesMainComponent } from './entidades-main.component';

describe('EntidadesMainComponent', () => {
  let component: EntidadesMainComponent;
  let fixture: ComponentFixture<EntidadesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadesMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntidadesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
