import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSurveyPageComponent } from './add-survey-page.component';

describe('AddSurveyPageComponent', () => {
  let component: AddSurveyPageComponent;
  let fixture: ComponentFixture<AddSurveyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSurveyPageComponent]
    });
    fixture = TestBed.createComponent(AddSurveyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
