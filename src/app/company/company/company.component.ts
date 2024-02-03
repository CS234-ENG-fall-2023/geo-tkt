import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAuthUser } from '../../auth/state/auth.selector';
import { getUserPosts } from '../../posts/state/posts.selector';
import { User, UserC } from '../../users/user.model';
import { Observable, map } from 'rxjs';
import { getUserPostsStart } from '../../posts/state/posts.actions';
import { Post, PostResponse } from '../../posts/post.model';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent {
  user$: Observable<UserC | null> = this.store.select(getAuthUser);
  postsResponse$: Observable<PostResponse> = this.store.select(getUserPosts);
  posts$: Observable<Post[]> = new Observable<Post[]>();
  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) {
        this.store.dispatch(getUserPostsStart({ payload: user.getId() }));
      }
    });
    this.posts$ = this.postsResponse$.pipe(map((res) => res.events));
  }
  constructor(private store: Store) {}
}
