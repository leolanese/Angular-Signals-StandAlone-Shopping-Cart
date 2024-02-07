import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-with-icon',
  standalone: true,
  template: `
    <div>
      <span class="item-icon">{{ item.icon }}</span>
      <span class="item-details">
        <b>{{ item.productName }}</b> - {{ item.quantity }} x £{{ item.price }}
      </span>
    </div>
  `,
  styles: [
    `
    .item-icon {
      font-size: 24px;
    }

    .item-details {
      margin-left: 10px;
    }
  `,
  ],
})
export class ItemWithIconComponent {
  @Input() item: any;
}
