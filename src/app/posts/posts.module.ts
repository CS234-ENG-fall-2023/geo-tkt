import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { POSTS_STATE_NAME } from './state/posts.effects';
import { PostsEffects } from './state/posts.effects';
import { PostsReducer } from './state/posts.reducer';
import { SharedModule } from '../shared/shared.module';
import { PostsSearchComponent } from './posts-search/posts-search.component';
import { PostCardComponent } from './post-card/post-card.component';
import { CardPageComponent } from '../card-page/card-page.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: PostsListComponent },
      { path: 'search/:query/:category', component: PostsSearchComponent },
      { path: ':id', component: CardPageComponent },
    ],
  },
];

@NgModule({
  declarations: [PostsListComponent, PostsSearchComponent, PostCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    EffectsModule.forFeature([PostsEffects]),
    RouterModule.forChild(routes),
    StoreModule.forFeature(POSTS_STATE_NAME, PostsReducer),
    SharedModule,
  ],
  exports: [PostCardComponent],
})
export class PostsModule {}
