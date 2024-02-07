import { Injectable, signal } from '@angular/core';
import { CartItem, ShoppingCart } from './cart-item.interface';
import { mockItems } from './mock.items';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<ShoppingCart>({
    items: mockItems,
    totalAmount: this.calculateTotalAmount(mockItems),
  });

  private calculateTotalAmount(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  addItem(item: CartItem) {
    this.cart.update((currentCart) => {
      const existingItem = currentCart.items.find(
        (i) => i.productId === item.productId
      );

      if (existingItem) {
        // Increment quantity if item already exists
        existingItem.quantity += item.quantity;
      } else {
        // Add the new item if it doesn't exist
        currentCart.items.push(item);
      }

      currentCart.totalAmount += item.price * item.quantity;

      return currentCart;
    });
  }

  removeItem(productId: string) {
    this.cart.update((currentCart) => {
      const item = currentCart.items.find((i) => i.productId === productId);

      if (item) {
        currentCart.totalAmount -= item.price * item.quantity;
        currentCart.items = currentCart.items.filter(
          (i) => i.productId !== productId
        );
      }

      return currentCart;
    });
  }
}
