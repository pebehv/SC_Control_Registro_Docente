import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEntidadesComponent } from './tab-entidades.component';

describe('TabEntidadesComponent', () => {
  let component: TabEntidadesComponent;
  let fixture: ComponentFixture<TabEntidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabEntidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
