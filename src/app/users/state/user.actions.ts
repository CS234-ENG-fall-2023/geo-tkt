import { User } from '../user.model';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
export enum useractionTypes {
  LOAD_USERS = '[User] Load Users',
  LOAD_USERS_SUCCESS = '[User] Load Users Success',
  LOAD_USERS_FAILURE = '[User] Load Users Failure',

  LOAD_USER = '[User] Load User',
  LOAD_USER_SUCCESS = '[User] Load User Success',
  LOAD_USER_FAILURE = '[User] Load User Failure',

  CREATE_USER = '[User] Create User',
  CREATE_USER_SUCCESS = '[User] Create User Success',
  CREATE_USER_FAILURE = '[User] Create User Failure',

  UPDATE_USER = '[User] Update User',
  UPDATE_USER_SUCCESS = '[User] Update User Success',
  UPDATE_USER_FAILURE = '[User] Update User Failure',

  DELETE_USER = '[User] Delete User',
  DELETE_USER_SUCCESS = '[User] Delete User Success',
  DELETE_USER_FAILURE = '[User] Delete User Failure',

  LOGIN_USER = '[User] Login User',
  LOGIN_USER_SUCCESS = '[User] Login User Success',
  LOGIN_USER_FAILURE = '[User] Login User Failure',

  LOGOUT_USER = '[User] Logout User',
  LOGOUT_USER_SUCCESS = '[User] Logout User Success',
  LOGOUT_USER_FAILURE = '[User] Logout User Failure',
}

export class LogoutUser implements Action {
  readonly type = useractionTypes.LOGOUT_USER;
}

export class LoadUsers implements Action {
  readonly type = useractionTypes.LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
  readonly type = useractionTypes.LOAD_USERS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadUsersFailure implements Action {
  readonly type = useractionTypes.LOAD_USERS_FAILURE;
  constructor(public payload: string) {}
}

export class LoadUser implements Action {
  readonly type = useractionTypes.LOAD_USER;
  constructor(public payload: string) {}
}

export class LoadUserSuccess implements Action {
  readonly type = useractionTypes.LOAD_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadUserFailure implements Action {
  readonly type = useractionTypes.LOAD_USER_FAILURE;
  constructor(public payload: string) {}
}

export class CreateUser implements Action {
  readonly type = useractionTypes.CREATE_USER;
  constructor(public payload: User) {}
}

export class CreateUserSuccess implements Action {
  readonly type = useractionTypes.CREATE_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class CreateUserFailure implements Action {
  readonly type = useractionTypes.CREATE_USER_FAILURE;
  constructor(public payload: string) {}
}

export class UpdateUser implements Action {
  readonly type = useractionTypes.UPDATE_USER;
  constructor(public payload: User) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = useractionTypes.UPDATE_USER_SUCCESS;
  constructor(public payload: Update<User>) {}
}

export class UpdateUserFailure implements Action {
  readonly type = useractionTypes.UPDATE_USER_FAILURE;
  constructor(public payload: string) {}
}

export class DeleteUser implements Action {
  readonly type = useractionTypes.DELETE_USER;
  constructor(public payload: string) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = useractionTypes.DELETE_USER_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteUserFailure implements Action {
  readonly type = useractionTypes.DELETE_USER_FAILURE;
  constructor(public payload: string) {}
}

export class LoginUser implements Action {
  readonly type = useractionTypes.LOGIN_USER;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginUserSuccess implements Action {
  readonly type = useractionTypes.LOGIN_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class LoginUserFailure implements Action {
  readonly type = useractionTypes.LOGIN_USER_FAILURE;
  constructor(public payload: string) {}
}

export type UserAction =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFailure
  | LoadUser
  | LoadUserSuccess
  | LoadUserFailure
  | CreateUser
  | CreateUserSuccess
  | CreateUserFailure
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFailure
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFailure
  | LoginUser
  | LoginUserSuccess
  | LoginUserFailure
  | LogoutUser;
