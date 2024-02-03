import { Component, ElementRef, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAuthUser } from '../auth/state/auth.selector';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user$ = this.store.select(getAuthUser);
  usershow: boolean = false;

  constructor(
    private store: Store,
    private elementRef: ElementRef,
    private translate: TranslateService,
    private router: Router
  ) {}

  userclicked() {
    this.usershow = !this.usershow;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.usershow = false;
    }
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }

  search(query: string) {
    var category = 'ALL';
    this.router.navigate(['/posts/search', query, category]);
  }
  logOut() {
    localStorage.removeItem('userData');
    location.reload(); // !@!
  }
}
