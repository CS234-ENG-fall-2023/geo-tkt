import { UserC } from 'src/app/users/user.model';

export interface AuthState {
  user: UserC | null;
}
export const initialAuthState: AuthState = {
  user: null,
};
