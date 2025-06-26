import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableArchivoComponent } from './table-archivo.component';

describe('TableArchivoComponent', () => {
  let component: TableArchivoComponent;
  let fixture: ComponentFixture<TableArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableArchivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
