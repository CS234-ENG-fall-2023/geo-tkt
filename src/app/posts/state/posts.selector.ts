import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

export const getPostsState = createFeatureSelector<PostsState>('posts');
export const getPosts = createSelector(
  getPostsState,
  (state: PostsState) => state.postResponse
);
export const getUserPosts = createSelector(
  getPostsState,
  (state: PostsState) => state.userPosts
);
export const getMessage = createSelector(
  getPostsState,
  (state: PostsState) => state.message
);
export const getActivePost = createSelector(
  getPostsState,
  (state: PostsState) => state.activePost
);
