export class PriceSale {
  is_on_sale: boolean;
  off_percent: number;
}

export class Price {
  price: number;
  is_competitive: boolean;
  call_to_buy: boolean;
  sale: PriceSale;
  is_used: boolean;
}
