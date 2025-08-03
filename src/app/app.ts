import { animate, style, transition, trigger } from '@angular/animations';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from './app.state';
import { Splashscreen } from './features/splashscreen/splashscreen';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, Splashscreen],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class App {
  private store = inject(Store);

  // Select the loading state from the store
  isLoading$: Observable<boolean> = this.store.select(AppState.isLoading);
}
