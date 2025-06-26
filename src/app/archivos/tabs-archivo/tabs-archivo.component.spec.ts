import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsArchivoComponent } from './tabs-archivo.component';

describe('TabsArchivoComponent', () => {
  let component: TabsArchivoComponent;
  let fixture: ComponentFixture<TabsArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsArchivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
