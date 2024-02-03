import {
  addPostSuccess,
  buyPostSuccess,
  deletePostSuccess,
  getActivePostSuccess,
  getPostsSuccess,
  getUserPostsSuccess,
  searchPostSuccess,
  updatePostSuccess,
} from './posts.actions';
import { initialState } from './posts.state';
import { Action, createReducer, on } from '@ngrx/store';
const _postsReducer = createReducer(
  initialState,
  on(getPostsSuccess, (state, action) => {
    return { ...state, postResponse: action.postResponse };
  }),
  on(getUserPostsSuccess, (state, action) => {
    return { ...state, userPosts: action.postResponse };
  }),
  // @ts-ignore
  on(addPostSuccess, (state, action) => {
    console.log(action);
    return {
      ...state,
      userPosts: {
        ...state.userPosts,
        events: [...state.userPosts.events, action],
      },
    };
  }),
  on(searchPostSuccess, (state, action) => {
    return { ...state, postResponse: action.postResponse };
  }),
  on(updatePostSuccess, (state, action) => {
    const updatedEvents = state.userPosts.events.map((post) =>
      post._id === action.post._id ? action.post : post
    );
    return {
      ...state,
      userPosts: {
        ...state.userPosts,
        events: updatedEvents,
      },
    };
  }),
  on(deletePostSuccess, (state, action) => {
    const updatedEvents = state.userPosts.events.filter(
      (post) => post._id !== action.id
    );
    return {
      ...state,
      userPosts: {
        ...state.userPosts,
        events: updatedEvents,
      },
    };
  }),
  on(getActivePostSuccess, (state, action) => {
    return { ...state, activePost: action.post };
  }),
  on(buyPostSuccess, (state, action) => {
    // bro...
    console.log(action.post);
    return { ...state, activePost: action.post };
  })
);

export function PostsReducer(
  state: typeof initialState | undefined,
  action: Action
) {
  return _postsReducer(state, action);
}
