import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesmentComponent } from './assesment.component';

describe('AssesmentComponent', () => {
  let component: AssesmentComponent;
  let fixture: ComponentFixture<AssesmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssesmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
