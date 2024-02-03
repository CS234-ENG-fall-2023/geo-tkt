import { NgModule } from '@angular/core';
import { UserLoginComponent } from './user-login/user-login.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AUTH_STATE_NAME } from './state/auth.effects';
import { AuthReducer } from './state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { SharedModule } from '../shared/shared.module';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: UserLoginComponent },
      { path: 'register', component: UserRegisterComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    EffectsModule.forFeature(),
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [UserLoginComponent, UserRegisterComponent],
})
export class AuthModule {}
