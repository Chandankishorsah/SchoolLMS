import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsAllComponent } from './schools-all.component';

describe('SchoolsAllComponent', () => {
  let component: SchoolsAllComponent;
  let fixture: ComponentFixture<SchoolsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
