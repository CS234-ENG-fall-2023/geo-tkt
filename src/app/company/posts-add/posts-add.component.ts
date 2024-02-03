import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addPostStart } from 'src/app/posts/state/posts.actions';
import { getMessage } from 'src/app/posts/state/posts.selector';
import { UserC } from 'src/app/users/user.model';
import { eventCategory } from 'src/app/events/events.model';
@Component({
  selector: 'app-posts-add',
  templateUrl: './posts-add.component.html',
  styleUrls: ['./posts-add.component.css'],
})
export class PostsAddComponent {
  @Input() user: UserC | null = null;
  visible: boolean = false;
  message$: Observable<string>;

  showDialog() {
    this.visible = true;
  }
  eventCategories = Object.values(eventCategory)
    .filter((category) => category !== eventCategory.ALL)
    .map((category) => ({ name: category }));
  postAdd: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.message$ = this.store.pipe(select(getMessage));
    this.postAdd = this.formBuilder.group({
      eventTitle: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      eventType: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventTiers: this.formBuilder.array([
        this.formBuilder.group({
          tierName: ['', Validators.required],
          tierPrice: ['', Validators.required],
          tierLimit: ['', Validators.required],
        }),
      ]),
    });
  }

  get eventTiers() {
    return this.postAdd.get('eventTiers') as FormArray;
  }

  addTier() {
    this.eventTiers.push(
      this.formBuilder.group({
        tierName: ['', Validators.required],
        tierPrice: ['', Validators.required],
        tierLimit: ['', Validators.required],
      })
    );
  }

  removeTier(index: number) {
    this.eventTiers.removeAt(index);
  }
  addPost() {
    if (this.user) {
      const { eventType, ...rest } = this.postAdd.value;
      this.store.dispatch(
        addPostStart({
          ...rest,
          eventType: eventType.name,
          companyName: this.user.getCompanyName(),
        })
      );
    }
  }
}
