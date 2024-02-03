import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { User } from '../user.model';
import { UserService } from '../user.service';
import * as userActions from './user.actions';
@Injectable()
export class UserEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.useractionTypes.LOAD_USERS),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users: User[]) => new userActions.LoadUsersSuccess(users)),
          catchError((err) => of(new userActions.LoadUsersFailure(err)))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.useractionTypes.LOAD_USER),
      switchMap((action: userActions.LoadUser) => {
        return this.userService.getUserById(action.payload).pipe(
          map((user: User) => new userActions.LoadUserSuccess(user)),
          catchError((err) => of(new userActions.LoadUserFailure(err)))
        );
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.useractionTypes.UPDATE_USER),
      switchMap((action: userActions.UpdateUser) =>
        this.userService.updateUser(action.payload).pipe(
          map(
            (user: User) =>
              new userActions.UpdateUserSuccess({
                id: user._id,
                changes: user,
              })
          ),
          catchError((err) => of(new userActions.UpdateUserFailure(err)))
        )
      )
    )
  );
}
