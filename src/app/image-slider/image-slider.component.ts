import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('* <=> *', [
        style({ transform: 'translateX({{ from }}%)' }),
        animate('0.2s ease-in-out', style({ transform: 'translateX({{ to }}%)' })),
      ]),
    ]),
    trigger('carouselItemAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.2s', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ImageSliderComponent {
  currentIndex = 0;

  carouselItems = [
    { src: '../../assets/image/avengers (2).jpg' },
    { src: '../../assets/image/1.jpg' },
    { src: '../../assets/image/3.jpg' },
    { src: '../../assets/image/4.jpg' },
  ];
  
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Start auto-scrolling
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    // Stop auto-scrolling on component destruction
    this.destroy$.next();
    this.destroy$.complete();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

  private startAutoScroll() {
    // Set the interval for auto-scrolling (adjust milliseconds as needed)
    interval(5000) // Auto-scroll every 5 seconds
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.nextSlide();
      });
  }
}
