import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Post, PostResponse } from '../post.model';
import { getPosts } from '../state/posts.selector';
import { PostsActionTypes, getPostsStart } from '../state/posts.actions';
@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent {
  postResponse$: Observable<PostResponse> = new Observable<PostResponse>();
  posts$: Observable<Post[]> = new Observable<Post[]>();
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(getPostsStart());
    this.postResponse$ = this.store.select(getPosts);
    this.posts$ = this.postResponse$.pipe(map((res) => res.events));
  }
}
