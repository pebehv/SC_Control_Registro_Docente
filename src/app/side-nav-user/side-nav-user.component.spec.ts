import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavUserComponent } from './side-nav-user.component';

describe('SideNavUserComponent', () => {
  let component: SideNavUserComponent;
  let fixture: ComponentFixture<SideNavUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
