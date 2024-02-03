import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsAddComponent } from './posts-add.component';

describe('PostsAddComponent', () => {
  let component: PostsAddComponent;
  let fixture: ComponentFixture<PostsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsAddComponent]
    });
    fixture = TestBed.createComponent(PostsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
