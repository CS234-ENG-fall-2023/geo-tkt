import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBallComponent } from './loading-ball.component';

describe('LoadingBallComponent', () => {
  let component: LoadingBallComponent;
  let fixture: ComponentFixture<LoadingBallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingBallComponent]
    });
    fixture = TestBed.createComponent(LoadingBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
