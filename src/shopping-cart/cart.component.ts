import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import { ItemWithIconComponent } from './item.icons';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ItemWithIconComponent],
  styles: [
    `
    div {
      font-family: 'Arial', sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      color: #333;
    }

    .cart-item {
      margin-bottom: 15px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .product-info {
      flex-grow: 1;
    }

    .remove-button {
      background-color: #dc3545;
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
    }

    .total-amount {
      margin-top: 15px;
      font-size: 18px;
    }

    .add-button {
      background-color: #28a745;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 3px;
      cursor: pointer;
    }
    .discount {
      margin-left: 15px;
    }
    .discount:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `,
  ],
  template: `
    <div>
      <h1>Shopping Cart using Signals Angular (17+)</h1>

      <div *ngFor="let item of cartItems" class="cart-item">
        <div class="product-info">
         <app-item-with-icon [item]="item"></app-item-with-icon>
        </div>
        <button (click)="removeItem(item.productId)" class="remove-button">Remove</button>
        <!-- <p>{{ item | json }}</p> -->
      </div>

      <hr>

      <div class="total-amount">
        <strong>Total:</strong> £{{ totalAmount }}
      </div>
      <button (click)="addItem()" class="add-button">🍌 Add Item</button>
      <button (click)="applyDiscount()" [disabled]="isDiscountApplied" class="add-button discount">💳 Apply Discount 10%</button>
    </div>
  `,
})
export class CartComponent {
  cartItems = this.cartService.cart().items;
  totalAmount = this.cartService.cart().totalAmount;
  isDiscountApplied = false;

  constructor(private cartService: CartService) {}

  addItem() {
    // fixed added product
    const newItem: any = {
      icon: '🍌',
      productName: 'bananas',
      productId: '004',
      quantity: 1,
      price: 10,
    };

    this.cartService.addItem(newItem);
    this.udpateCart();
  }

  removeItem(productId: string) {
    this.cartService.removeItem(productId);
    this.udpateCart();
  }

  udpateCart() {
    // Update cartItems and totalAmount after removing an item
    this.cartItems = this.cartService.cart().items;
    this.totalAmount = this.cartService.cart().totalAmount;
  }

  applyDiscount() {
    if (!this.isDiscountApplied) {
      //  subtract 10%
      this.totalAmount -= this.totalAmount * 0.1;
      this.isDiscountApplied = true;
    }
  }
}
