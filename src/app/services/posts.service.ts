import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, PostResponse } from '../posts/post.model';
import { Observable, map, tap } from 'rxjs';
import { eventCategory } from '../events/events.model';
@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}
  getPosts(): Observable<PostResponse> {
    return this.http.get<PostResponse>('http://localhost:8073/api/v1/events');
  }
  getPostsByUserId(payload: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(
      'http://localhost:8073/api/v1/events?userId=' + payload
    );
  }
  getPostById(id: string): Observable<Post> {
    return this.http
      .get<{ event: Post }>(`http://localhost:8073/api/v1/events/${id}`)
      .pipe(
        tap((response) => console.log(response.event)),
        map((response) => response.event)
      );
  }
  searchPost(
    title: string,
    page: number,
    eventType: eventCategory
  ): Observable<PostResponse> {
    console.log(title, page, eventType);
    return this.http.get<PostResponse>(
      `http://localhost:8073/api/v1/events?eventTitle=${title}&page=${page}&eventType=${eventType}`
    );
  }

  addPost(payload: any): Observable<string> {
    console.log(payload);
    return this.http
      .post<{ message: string }>('http://localhost:8073/api/v1/events', payload)
      .pipe(map((response) => response.message));
  }
  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(`http://localhost:8073/api/v1/events/${id}`);
  }
  updatePost(post: Post): Observable<Post> {
    console.log(post._id);
    return this.http.patch<Post>(
      `http://localhost:8073/api/v1/events/${post._id}`,
      post
    );
  }
  buyPost(id: string, tierName: string): Observable<Post> {
    var tierNames: string[] = [tierName];
    return this.http
      .put<{ event: Post }>(`http://localhost:8073/api/v1/events/${id}`, {
        tierNames: tierNames,
      })
      .pipe(map((response) => response.event));
  }
}
