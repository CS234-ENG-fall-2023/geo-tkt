import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import * as fromUser from '../state/user.reducer';
import * as userActions from '../state/user.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent {
  @Input() userId: string | null = null;

  userForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private store: Store<fromUser.AppState>
  ) {}
  ngOnInit(): void {
    if (this.userId !== null) {
      this.store.dispatch(new userActions.LoadUser(this.userId));
    }
    const user$: Observable<User> = this.store
      .select(fromUser.getCurrentUser)
      .pipe(filter((user) => user !== undefined)) as Observable<User>;
    this.userForm = this.fb.group({
      _id: [''],
      name: [''],
      lastName: [''],
      email: [''],
      role: [''],
      balance: [''],
      myTickets: [''],
      companyName: [''],
      approved: [''],
    });

    user$.subscribe((currentUser: User) => {
      if (currentUser) {
        this.userForm.patchValue({
          _id: currentUser._id,
          name: currentUser.name,
          lastName: currentUser.lastName,
          email: currentUser.email,
          role: currentUser.role,
          balance: currentUser.balance,
          myTickets: currentUser.myTickets,
          companyName: currentUser.companyName,
          approved: currentUser.approved,
          __v: currentUser.__v,
        });
      } else {
        console.log('currentUser is undefined noob');
      }
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      const updatedUser: User = {
        _id: this.userForm.value._id,
        name: this.userForm.value.name,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        role: this.userForm.value.role,
        balance: this.userForm.value.balance,
        myTickets: this.userForm.value.myTickets,
        companyName: this.userForm.value.companyName,
        approved: this.userForm.value.approved,
        __v: this.userForm.value.__v,
      };
      this.store.dispatch(new userActions.UpdateUser(updatedUser));
      // reload the page
      // !@!
    } else {
      console.error('Form is invalid');
    }
  }
}
