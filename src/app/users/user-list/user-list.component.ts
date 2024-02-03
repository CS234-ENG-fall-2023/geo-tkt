import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as userActions from '../state/user.actions';
import * as fromUser from '../state/user.reducer';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users$: Observable<User[]> = new Observable<User[]>();
  errors$: Observable<String> = new Observable<String>();

  selectedUserId: string | null = null;

  constructor(private store: Store<fromUser.AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(new userActions.LoadUsers());
    this.users$ = this.store.pipe(select(fromUser.getUsers));
  }

  editUser(user: User) {
    this.selectedUserId = user._id;
  }

  deleteUser(user: User) {
    if (confirm('Do you really want to delete this user?')) {
      this.store.dispatch(new userActions.DeleteUser(user._id!));
    }
  }

  cancelEdit() {
    this.selectedUserId = null;
  }
}
