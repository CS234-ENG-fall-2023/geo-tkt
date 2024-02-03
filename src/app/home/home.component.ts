import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { eventCategory } from '../events/events.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private translate: TranslateService, private router: Router) {}

  movies: string = '⠀Movies';
  sports: string = '⠀Sports';
  concerts: string = 'Concerts';
  filterCategory(category: string) {
    var query = '';
    this.router.navigate(['/posts/search', query, category]);
  }
}
