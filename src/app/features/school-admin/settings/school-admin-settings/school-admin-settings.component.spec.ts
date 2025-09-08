import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminSettingsComponent } from './school-admin-settings.component';

describe('SchoolAdminSettingsComponent', () => {
  let component: SchoolAdminSettingsComponent;
  let fixture: ComponentFixture<SchoolAdminSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolAdminSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolAdminSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
