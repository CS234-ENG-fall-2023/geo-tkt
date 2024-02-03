import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserRole } from 'src/app/users/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { registerStart } from '../state/auth.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  
  registerForm: FormGroup;
  userRole: UserRole | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private translate: TranslateService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      role: ['', Validators.required],
      lastName: [''],
      companyName: [''],
    });

    this.registerForm.get('role')?.valueChanges.subscribe((role) => {
      this.userRole = role as UserRole; // Update userRole when role form control's value changes

      const companyNameControl = this.registerForm.get('companyName');
      const lastNameControl = this.registerForm.get('lastName');

      this.registerForm.patchValue({
        companyName: '',
        lastName: '',
      });

      if (role === 'ORGANIZER') {
        companyNameControl?.setValidators([Validators.required]);
        lastNameControl?.setValidators(null);
      } else if (role === 'CUSTOMER') {
        companyNameControl?.setValidators(null);
        lastNameControl?.setValidators([Validators.required]);
      } else {
        companyNameControl?.setValidators(null);
        lastNameControl?.setValidators(null);
      }
      companyNameControl?.updateValueAndValidity();
      lastNameControl?.updateValueAndValidity();
    });
  }

  register() {
    const user = {};
    this.store.dispatch(registerStart({ user: this.registerForm.value }));
  }
}
