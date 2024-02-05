export interface PaymentCard {
  card: string;
  date: string;
  cvc: string;
}
export interface Card {
  number: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
}
