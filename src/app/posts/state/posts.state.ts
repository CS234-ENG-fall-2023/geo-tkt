import { Post, PostResponse } from '../post.model';

export interface PostsState {
  activePost: Post;
  postResponse: PostResponse;
  userPosts: PostResponse;
  message: string;
}
export const initialState: PostsState = {
  activePost: {
    _id: '',
    eventTitle: '',
    eventType: '',
    date: new Date(),
    description: '',
    url: '',
    eventLocation: '',
    time: '',
    eventTiers: [],
    companyName: '',
  },
  postResponse: {
    events: [],
    total: 0,
    numOfPages: 0,
    currentPage: 0,
  },
  userPosts: {
    events: [],
    total: 0,
    numOfPages: 0,
    currentPage: 0,
  },
  message: '',
};
