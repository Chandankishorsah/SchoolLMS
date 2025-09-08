import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsManagerComponent } from './schools-manager.component';

describe('SchoolsManagerComponent', () => {
  let component: SchoolsManagerComponent;
  let fixture: ComponentFixture<SchoolsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
