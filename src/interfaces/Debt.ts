import Payment from "./Payment";

export default interface Debt extends Payment {
  hours: number;
  isPaid: boolean;
  partial: number;
}
