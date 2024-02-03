import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'http://localhost:8073/api/v1/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + '/admin/all-users', {
      withCredentials: true,
    });
  }
  getUserById(payload: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/admin/find-user/' + payload, {
      withCredentials: true,
    });
  }

  updateUser(payload: User): Observable<User> {
    return this.http.patch<User>(
      this.usersUrl + '/update-user/' + payload._id,
      {
        firstName: payload.name,
        approved: payload.approved,
      },
      {
        withCredentials: true,
      }
    );
  }

  deleteUser(payload: number) {
    console.log('user service: Delete User');
    return this.http.delete(`${this.usersUrl}/${payload}`, {
      withCredentials: true,
    });
  }
}
