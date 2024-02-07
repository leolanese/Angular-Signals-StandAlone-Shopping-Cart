export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface ShoppingCart {
  items: CartItem[];
  totalAmount: number;
}
