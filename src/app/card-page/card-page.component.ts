import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { buyPostStart, getActivePostStart } from '../posts/state/posts.actions';
import { Post } from '../posts/post.model';
import { getActivePost } from '../posts/state/posts.selector';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css'],
})
export class CardPageComponent {
  @Input() id: string = '';
  activePost$ = new Observable<Post>();
  constructor(private route: ActivatedRoute, private store: Store) {}
  ngOnInit() {
    this.route.paramMap
      .pipe(map((params) => params.get('id')))
      .subscribe((id) => {
        if (id !== null) {
          this.id = id;
          this.store.dispatch(getActivePostStart({ payload: this.id }));
          this.activePost$ = this.store.select(getActivePost);
        }
      });
  }
  buyTicket(tierName: string, id: string) {
    this.store.dispatch(buyPostStart({ payload: { tierName, id } }));
  }
  formatDate(date: Date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
