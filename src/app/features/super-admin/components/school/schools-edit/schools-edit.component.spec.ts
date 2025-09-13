import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsEditComponent } from './schools-edit.component';

describe('SchoolsEditComponent', () => {
  let component: SchoolsEditComponent;
  let fixture: ComponentFixture<SchoolsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
