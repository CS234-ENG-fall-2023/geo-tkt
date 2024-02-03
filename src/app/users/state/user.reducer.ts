import * as userActions from './user.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user.model';
import * as fromRoot from '../../store/app.state';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
export interface UserState {
  selectedUserId: string | null;
  error: string;
  loading: boolean;
  loaded: boolean;
  loggedInUser: User | null;
}
export interface AppState extends fromRoot.AppState {
  users: UserState;
}
export interface UserState {
  users: User[];
  selectedUserId: string | null;
  error: string;
  loading: boolean;
  loaded: boolean;
  loggedInUser: User | null;
}
export const defaultUser: UserState = {
  users: [],
  selectedUserId: null,
  error: '',
  loading: false,
  loaded: false,
  loggedInUser: null,
};
export const initialState = defaultUser;
export function userReducer(
  state = initialState,
  action: userActions.UserAction
): UserState {
  switch (action.type) {
    case userActions.useractionTypes.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loggedInUser: action.payload,
      };
    }

    case userActions.useractionTypes.LOAD_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        users: action.payload.users,
      };
    } //
    case userActions.useractionTypes.LOAD_USER_SUCCESS: {
      return {
        ...state,
        selectedUserId: action.payload.user._id,
      };
    }
    case userActions.useractionTypes.LOAD_USER_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case userActions.useractionTypes.CREATE_USER_SUCCESS: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }
    case userActions.useractionTypes.CREATE_USER_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case userActions.useractionTypes.UPDATE_USER_SUCCESS: {
      const updatedUsers = state.users.map((user) =>
        user._id === action.payload.id
          ? { ...user, ...action.payload.changes }
          : user
      );
      return {
        ...state,
        users: updatedUsers,
      };
    }
    case userActions.useractionTypes.UPDATE_USER_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case userActions.useractionTypes.DELETE_USER_SUCCESS: {
      const updatedUsers = state.users.filter(
        (user) => user._id !== action.payload
      );
      return {
        ...state,
        users: updatedUsers,
      };
    }
    case userActions.useractionTypes.DELETE_USER_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

const getUserFeatureState = createFeatureSelector<UserState>('users');
export const getUsers = createSelector(
  (state: AppState) => state.users,
  (userState: UserState) => userState.users
);
export const getUsersLoading = createSelector(
  getUserFeatureState,
  (state) => state.loading
);

export const getUsersLoaded = createSelector(
  getUserFeatureState,
  (state) => state.loaded
);

export const getUsersError = createSelector(
  getUserFeatureState,
  (state) => state.error
);

export const getCurrentUserId = createSelector(
  getUserFeatureState,
  (state) => state.selectedUserId
);
export const getCurrentUser = createSelector(
  getUserFeatureState,
  getCurrentUserId,
  (state) => state.users.find((user) => user._id === state.selectedUserId)
);
export const getLoggedInUser = createSelector(
  getUserFeatureState,
  (state: UserState) => (state ? state.loggedInUser : undefined)
);
