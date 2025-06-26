import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCasosComponent } from './table-casos.component';

describe('TableCasosComponent', () => {
  let component: TableCasosComponent;
  let fixture: ComponentFixture<TableCasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCasosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
