export const AUTH_STATE_NAME = 'auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import {
  autoLogin,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
} from './auth.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AuthResponseData } from 'src/app/models/AuthResponseData.model';
import { UserC, UserRole } from 'src/app/users/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(data);
            return loginSuccess({ user });
          })
        );
      })
    );
  });
  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          if (action.user.getRole() === UserRole.ADMIN) {
            this.router.navigate(['/users']); // !@! redirect wherever idk
          } else {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerStart),
      exhaustMap((action) => {
        return this.authService.register(action.user).pipe(
          map((data) => {
            return registerSuccess({ success: true });
          })
        );
      })
    );
  });
  registerRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        tap((action) => {
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap(() => {
        const user = this.authService.getUserFromLocalStorage();
        const userC = this.formatUser(user!);
        return of(loginSuccess({ user: this.formatUser(user!) }));
      })
    );
  });
  formatUser(data: AuthResponseData): UserC {
    const user = new UserC(
      data._id,
      data.email,
      data.role,
      data.name,
      data.companyName
    );
    return user;
  }
}
