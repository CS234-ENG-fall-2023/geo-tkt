import { Component, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { getAuthUser } from './auth/state/auth.selector';
import { Observable } from 'rxjs';
import { UserC } from './users/user.model';
import { autoLogin, loginStart, loginSuccess } from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GayTKT';

  user$: Observable<UserC | null> = this.store.select(getAuthUser);

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private store: Store
  ) {
    translate.setDefaultLang('en');
  }
  ngOnInit() {
    this.store.dispatch(autoLogin());
  }
}
