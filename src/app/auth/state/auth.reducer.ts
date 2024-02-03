import { Action, createReducer, on } from '@ngrx/store';
import { UserState, initialState } from 'src/app/users/state/user.reducer';
import { User } from 'src/app/users/user.model';
import { loginSuccess } from './auth.actions';

const __authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return { ...state, user: action.user };
  })
);

export function AuthReducer(state: UserState | undefined, action: Action) {
  return __authReducer(state, action);
}
