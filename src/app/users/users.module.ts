import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { EffectsModule } from '@ngrx/effects';
import { Action } from 'rxjs/internal/scheduler/Action';
import { UserEffect } from './state/user.effect';
import { StoreModule } from '@ngrx/store';

import { userReducer } from './state/user.reducer';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    UserAddComponent,
    UserListComponent,
    UserEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    EffectsModule.forFeature(UserEffect),
    StoreModule.forFeature('users', userReducer),
  ],
  exports: [UserComponent],
})
export class UsersModule {}
