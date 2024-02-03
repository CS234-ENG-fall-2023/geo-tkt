import { Component, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent {
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
