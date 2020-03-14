import PaymentType from "../interfaces/PaymentType";
import PaymentTotals from "../interfaces/PaymentTotals";
import { YEARS_TO_IGNORE } from "../constants";

export const getAverage = (paymentsByYears: PaymentTotals) => {
  const keys = Object.keys(paymentsByYears).filter((key: string) => !YEARS_TO_IGNORE.includes(key));
  if (keys.length === 0) return 0;
  return Math.round(
    keys.reduce((total: number, key: string) => total + paymentsByYears[key].total, 0) / keys.length
  );
};

export const getMax = (payments: PaymentType[]) => {
  if (!payments) return;
  return payments.reduce((maxPayment: PaymentType | undefined, currentPayment: PaymentType) => {
    if (!maxPayment) return currentPayment;
    if (currentPayment.amount > maxPayment.amount) return currentPayment;
    return maxPayment;
  }, undefined);
};
