import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as userActions from '../state/user.actions';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent {
  userForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  reloadPage() {
    location.reload();
  }
  constructor(private store: Store) {}
  createUser() {
    const user = this.userForm.value;
    console.log(user);
    this.store.dispatch(new userActions.CreateUser(user));
  }
}
