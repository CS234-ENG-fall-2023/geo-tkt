import { createAction, props } from '@ngrx/store';
import { Post, PostResponse } from '../post.model';
import { eventCategory } from 'src/app/events/events.model';

export enum PostsActionTypes {
  GETPOSTS_START = '[Posts] Get Posts Start',
  GETPOSTS_SUCCESS = '[Posts] Get Posts Success',
  GETPOSTS_FAILURE = '[Posts] Get Posts Failure',

  ADDPOST_START = '[Posts] Add Post Start',
  ADDPOST_SUCCESS = '[Posts] Add Post Success',
  ADDPOST_FAILURE = '[Posts] Add Post Failure',

  DELETEPOST_START = '[Posts] Delete Post Start',
  DELETEPOST_SUCCESS = '[Posts] Delete Post Success',
  DELETEPOST_FAILURE = '[Posts] Delete Post Failure',

  UPDATEPOST_START = '[Posts] Update Post Start',
  UPDATEPOST_SUCCESS = '[Posts] Update Post Success',
  UPDATEPOST_FAILURE = '[Posts] Update Post Failure',

  GETPOST_START = '[Posts] Get Post Start',
  GETPOST_SUCCESS = '[Posts] Get Post Success',
  GETPOST_FAILURE = '[Posts] Get Post Failure',

  GETPOSTSBYCATEGORY_START = '[Posts] Get Posts By Category Start', // jer naghdad ar dagvtchirdeba lmao
  GETPOSTSBYCATEGORY_SUCCESS = '[Posts] Get Posts By Category Success',
  GETPOSTSBYCATEGORY_FAILURE = '[Posts] Get Posts By Category Failure',

  GETUSERPOSTS_START = '[Posts] Get User Posts Start',
  GETUSERPOSTS_SUCCESS = '[Posts] Get User Posts Success',
  GETUSERPOSTS_FAILURE = '[Posts] Get User Posts Failure',

  SEARCHPOSTSBYTITLE_START = '[Posts] Search Posts By Title Start',
  SEARCHPOSTSBYTITLE_SUCCESS = '[Posts] Search Posts By Title Success',
  SEARCHPOSTSBYTITLE_FAILURE = '[Posts] Search Posts By Title Failure',

  BUYPOST_START = '[Posts] Buy Post Start',
  BUYPOST_SUCCESS = '[Posts] Buy Post Success',
  BUYPOST_FAILURE = '[Posts] Buy Post Failure',
}

export const getPostsStart = createAction(PostsActionTypes.GETPOSTS_START);
export const getPostsSuccess = createAction(
  PostsActionTypes.GETPOSTS_SUCCESS,
  props<{ postResponse: PostResponse }>()
);
export const getPostsFailure = createAction(
  PostsActionTypes.GETPOSTS_FAILURE,
  props<{ error: string }>()
);

export const getUserPostsStart = createAction(
  PostsActionTypes.GETUSERPOSTS_START,
  props<{ payload: string }>()
);
export const getUserPostsSuccess = createAction(
  PostsActionTypes.GETUSERPOSTS_SUCCESS,
  props<{ postResponse: PostResponse }>()
);

export const addPostStart = createAction(
  PostsActionTypes.ADDPOST_START,
  props<{ payload: any }>()
);
export const addPostSuccess = createAction(
  PostsActionTypes.ADDPOST_SUCCESS,
  props<{ payload: any }>()
);
export const searchPostStart = createAction(
  PostsActionTypes.SEARCHPOSTSBYTITLE_START,
  props<{ title: string; page: number; eventType: eventCategory }>()
);
export const searchPostSuccess = createAction(
  PostsActionTypes.SEARCHPOSTSBYTITLE_SUCCESS,
  props<{ postResponse: PostResponse }>()
);
export const searchPostsByTitleFailure = createAction(
  PostsActionTypes.SEARCHPOSTSBYTITLE_FAILURE,
  props<{ error: string }>()
);
export const getPostStart = createAction(
  PostsActionTypes.GETPOST_START,
  props<{ payload: string }>()
);
export const getPostSuccess = createAction(
  PostsActionTypes.GETPOST_SUCCESS,
  props<{ post: Event }>()
);

export const updatePostStart = createAction(
  PostsActionTypes.UPDATEPOST_START,
  props<{ payload: Post }>()
);

export const updatePostSuccess = createAction(
  PostsActionTypes.UPDATEPOST_SUCCESS,
  props<{ post: Post }>() //
);
export const deletePostStart = createAction(
  PostsActionTypes.DELETEPOST_START,
  props<{ payload: string }>()
);
export const deletePostSuccess = createAction(
  PostsActionTypes.DELETEPOST_SUCCESS,
  props<{ id: string }>()
);

export const getActivePostStart = createAction(
  PostsActionTypes.GETPOST_START,
  props<{ payload: string }>()
);
export const getActivePostSuccess = createAction(
  PostsActionTypes.GETPOST_SUCCESS,
  props<{ post: Post }>()
);
export const buyPostStart = createAction(
  PostsActionTypes.BUYPOST_START,
  props<{ payload: { tierName: string; id: string } }>()
);
export const buyPostSuccess = createAction(
  PostsActionTypes.BUYPOST_SUCCESS,
  props<{ post: Post }>()
);
