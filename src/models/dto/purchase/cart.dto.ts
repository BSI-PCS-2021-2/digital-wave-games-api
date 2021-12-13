export class PostCartDTO {
  clientId: number;
}

export class PutCartDTO {
  cartId: number;
  productId: number;
  amount: number;
}
