import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { CartComponent } from './shopping-cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CartComponent],
  template: `
    <app-cart></app-cart>
  `,
})
export class App {}

bootstrapApplication(App, {
  providers: [],
});
