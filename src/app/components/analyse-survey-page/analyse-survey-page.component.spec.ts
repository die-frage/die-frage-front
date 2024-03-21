import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseSurveyPageComponent } from './analyse-survey-page.component';

describe('AnalyseSurveyPageComponent', () => {
  let component: AnalyseSurveyPageComponent;
  let fixture: ComponentFixture<AnalyseSurveyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyseSurveyPageComponent]
    });
    fixture = TestBed.createComponent(AnalyseSurveyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
