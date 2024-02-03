import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getAuthUser = createSelector(getAuthState, (state: AuthState) =>
  state ? state.user : null
);
