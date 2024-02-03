import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserC, UserRole } from '../users/user.model';
import { Observable, map, tap } from 'rxjs';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { loginSuccess } from '../auth/state/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}
  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:8073/api/v1/auth/login',
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .pipe(
        tap((data: AuthResponseData) => {
          localStorage.setItem('token', data.token);
          this.store.dispatch(loginSuccess({ user: this.formatUser(data) }));
        })
      );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:8073/api/v1/auth/register',
      user
    );
  }

  setUserInLocalStorage(user: AuthResponseData) {
    localStorage.setItem('userData', JSON.stringify(this.formatUser(user)));
  }
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
  getUserFromLocalStorage(): AuthResponseData | null {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  }
}
