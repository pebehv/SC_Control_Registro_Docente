import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEntidadesComponent } from './table-entidades.component';

describe('TableEntidadesComponent', () => {
  let component: TableEntidadesComponent;
  let fixture: ComponentFixture<TableEntidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEntidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
