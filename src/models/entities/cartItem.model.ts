export class CartItem {
  public cartId?: number;
  public clientId?: number;
  public productId?: number;
  public amount?: number;

  constructor(props: CartItem) {
    Object.assign(this, props);
  }
}
