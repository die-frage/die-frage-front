import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAuthorisedComponent } from './header-authorised.component';

describe('HeaderAuthorisedComponent', () => {
  let component: HeaderAuthorisedComponent;
  let fixture: ComponentFixture<HeaderAuthorisedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderAuthorisedComponent]
    });
    fixture = TestBed.createComponent(HeaderAuthorisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
