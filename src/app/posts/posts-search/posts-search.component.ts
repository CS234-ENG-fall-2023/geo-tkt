import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { searchPostStart } from '../state/posts.actions';
import { Post, PostResponse } from '../post.model';
import { Observable } from 'rxjs';
import { getPosts } from '../state/posts.selector';
import { eventCategory } from 'src/app/events/events.model';
@Component({
  selector: 'app-posts-search',
  templateUrl: './posts-search.component.html',
  styleUrls: ['./posts-search.component.css'],
})
export class PostsSearchComponent {
  @Input() searchQuery: string = '';
  @Input() searchCategory: eventCategory = eventCategory.ALL;
  activePage: number = 1;
  lastPage: number = 1;

  constructor(private route: ActivatedRoute, private store: Store) {}
  postResponse$: Observable<PostResponse> = new Observable<PostResponse>();
  numOfPages$: Observable<number[]> = new Observable<number[]>();

  posts$: Observable<Post[]> = new Observable<Post[]>();
  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => ({
          query: params.get('query'),
          category: params.get('category'),
        }))
      )
      .subscribe(({ query, category }) => {
        if (query !== null) {
          console.log(category?.toUpperCase());
          this.searchQuery = query;
          this.searchCategory = category
            ? (category.toUpperCase() as eventCategory)
            : eventCategory.ALL;
          this.dispatchSearchPosts();
        }
      });
  }

  dispatchSearchPosts() {
    this.store.dispatch(
      searchPostStart({
        title: this.searchQuery,
        page: this.activePage,
        eventType: this.searchCategory,
      })
    );
    this.postResponse$ = this.store.select(getPosts);
    this.posts$ = this.postResponse$.pipe(map((res) => res.events));
    this.numOfPages$ = this.postResponse$.pipe(
      map((res) => {
        this.lastPage = res.numOfPages;
        return Array.from({ length: res.numOfPages }, (_, i) => i + 1);
      })
    );
  }

  setPage(newPage: number) {
    this.activePage = newPage;
    this.dispatchSearchPosts();
  }
}
