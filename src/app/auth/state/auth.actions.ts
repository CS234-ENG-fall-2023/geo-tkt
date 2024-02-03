import { createAction, props } from '@ngrx/store';
import { User, UserC } from 'src/app/users/user.model';

export enum AuthActionTypes {
  LOGIN_START = '[Auth] Login Start',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',

  REGISTER_START = '[Auth] Register Start',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',

  AUTO_LOGIN = '[Auth] Auto Login',
}

export const loginStart = createAction(
  AuthActionTypes.LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ user: UserC }>()
);

export const registerStart = createAction(
  AuthActionTypes.REGISTER_START,
  props<{ user: User }>()
);

export const registerSuccess = createAction(
  AuthActionTypes.REGISTER_SUCCESS,
  props<{ success: boolean }>()
);

export const autoLogin = createAction(AuthActionTypes.AUTO_LOGIN);
