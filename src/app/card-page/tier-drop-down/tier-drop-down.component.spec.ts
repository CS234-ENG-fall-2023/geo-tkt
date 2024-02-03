import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierDropDownComponent } from './tier-drop-down.component';

describe('TierDropDownComponent', () => {
  let component: TierDropDownComponent;
  let fixture: ComponentFixture<TierDropDownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TierDropDownComponent]
    });
    fixture = TestBed.createComponent(TierDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
