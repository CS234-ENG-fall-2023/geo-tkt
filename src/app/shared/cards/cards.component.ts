import { Component, Input } from '@angular/core';
import { Post } from 'src/app/posts/post.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  @Input() post: Post = {
    _id: '',
    eventTitle: '',
    eventType: '',
    date: new Date(),
    description: '',
    url: '',
    eventLocation: '',
    time: '',
    eventTiers: [],
    companyName: '',
  };
}
