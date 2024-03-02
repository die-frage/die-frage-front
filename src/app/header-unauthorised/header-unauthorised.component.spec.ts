import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUnauthorisedComponent } from './header-unauthorised.component';

describe('HeaderUnauthorisedComponent', () => {
  let component: HeaderUnauthorisedComponent;
  let fixture: ComponentFixture<HeaderUnauthorisedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderUnauthorisedComponent]
    });
    fixture = TestBed.createComponent(HeaderUnauthorisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
