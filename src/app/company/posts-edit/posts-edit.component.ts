import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/posts/post.model';
import {
  addPostStart,
  deletePostStart,
  updatePostStart,
} from 'src/app/posts/state/posts.actions';
import { getMessage } from 'src/app/posts/state/posts.selector';
import { UserC } from 'src/app/users/user.model';

@Component({
  selector: 'app-posts-edit',
  templateUrl: './posts-edit.component.html',
  styleUrls: ['./posts-edit.component.css'],
})
export class PostsEditComponent {
  @Input() post!: Post;
  defaultDate = new Date();
  visible: boolean = false;
  message$: Observable<string>;
  postEdit: FormGroup;
  showDialog() {
    this.visible = true;
  }
  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.message$ = this.store.pipe(select(getMessage));
    this.postEdit = this.formBuilder.group({
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
  ngOnChanges() {
    this.populateForm();
  }
  populateForm() {
    if (this.post) {
      this.postEdit.patchValue({
        eventTitle: this.post.eventTitle,
        description: this.post.description,
        url: this.post.url,
        eventType: this.post.eventType,
        date: this.post.date,
        time: this.post.time,
        eventLocation: this.post.eventLocation,
        // assuming eventTiers is an array of objects with tierName, tierPrice, and tierLimit properties
        eventTiers: this.post.eventTiers,
      });
    }
  }

  get eventTiers() {
    return this.postEdit.get('eventTiers') as FormArray;
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
  updatePost() {
    this.store.dispatch(
      updatePostStart({
        payload: { ...this.postEdit.value, _id: this.post._id },
      })
    );
  }
  deletePost() {
    this.store.dispatch(deletePostStart({ payload: this.post._id }));
  }
}
