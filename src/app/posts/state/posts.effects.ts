import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap, tap } from 'rxjs';
import {
  getPostsSuccess,
  getPostsStart,
  getUserPostsStart,
  getUserPostsSuccess,
  addPostStart,
  addPostSuccess,
  searchPostStart,
  searchPostSuccess,
  updatePostStart,
  updatePostSuccess,
  deletePostStart,
  deletePostSuccess,
  getActivePostStart,
  getActivePostSuccess,
  buyPostStart,
  buyPostSuccess,
} from './posts.actions';
import { PostsService } from 'src/app/services/posts.service';
import { Post, PostResponse } from '../post.model';
import { Store } from '@ngrx/store';
export const POSTS_STATE_NAME = 'posts';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store
  ) {}
  getPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getPostsStart),
      exhaustMap(() => {
        return this.postsService.getPosts().pipe(
          map((postResponse: PostResponse) => {
            return getPostsSuccess({ postResponse });
          })
        );
      })
    );
  });
  getUserPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserPostsStart),
      exhaustMap((action) => {
        return this.postsService.getPostsByUserId(action.payload).pipe(
          map((postResponse: PostResponse) => {
            return getUserPostsSuccess({ postResponse });
          })
        );
      })
    );
  });
  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPostStart),
      exhaustMap((action) => {
        return this.postsService.addPost(action).pipe(
          map((message: string) => {
            return addPostSuccess(action);
          })
        );
      })
    );
  });
  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePostStart),
      exhaustMap((action) => {
        console.log(action);
        return this.postsService.updatePost(action.payload).pipe(
          map(() => {
            return updatePostSuccess({ post: action.payload });
          })
        );
      })
    );
  });
  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePostStart),
      exhaustMap((action) => {
        return this.postsService.deletePost(action.payload).pipe(
          map(() => {
            return deletePostSuccess({ id: action.payload });
          })
        );
      })
    );
  });
  searchPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchPostStart),
      exhaustMap((action) => {
        console.log('hello from effects,', action.eventType);

        return this.postsService
          .searchPost(action.title, action.page, action.eventType)
          .pipe(
            map((postResponse: PostResponse) => {
              return searchPostSuccess({ postResponse });
            })
          );
      })
    );
  });

  getActivePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getActivePostStart),
      switchMap((action) => {
        return this.postsService
          .getPostById(action.payload)
          .pipe(map((post) => getActivePostSuccess({ post })));
      })
    );
  });

  buyPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(buyPostStart),
      switchMap((action) => {
        return this.postsService
          .buyPost(action.payload.id, action.payload.tierName)
          .pipe(map((post) => buyPostSuccess({ post })));
      })
    );
  });
}
