import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsAddComponent } from './schools-add.component';

describe('SchoolsAddComponent', () => {
  let component: SchoolsAddComponent;
  let fixture: ComponentFixture<SchoolsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
