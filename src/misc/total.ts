import PaymentType from "../interfaces/PaymentType";
import SubjectType from "../interfaces/Subject";
import TagType from "../interfaces/Tag";
import { compareByKey } from "./misc";

interface Totals {
  [key: string]: number;
}

export const getPaymentsTotal = (payments: PaymentType[]) =>
  payments.reduce((total: number, payment: PaymentType) => total + payment.amount, 0);

export const getPaymentsTotalByYear = (payments: PaymentType[], year: number) =>
  payments.reduce(
    (total: number[], payment: PaymentType) => {
      const currentItemYear = new Date(payment.date).getFullYear();
      if (currentItemYear === year) {
        return [total[0] + payment.amount, total[1]];
      }
      if (currentItemYear === year - 1) {
        return [total[0], total[1] + payment.amount];
      }
      return total;
    },
    [0, 0]
  );

export const sortByTotal = <T extends SubjectType | TagType>(items: T[], totals: Totals) => {
  const sorted = [...items];
  sorted.sort((a: T, b: T) => {
    const aTotal = totals[a._id] || 0;
    const bTotal = totals[b._id] || 0;
    if (aTotal === bTotal) return compareByKey(a, b, "name");
    return bTotal - aTotal;
  });
  return sorted;
};
export const getTotalBySubject = (payments: PaymentType[]) => {
  if (!payments) return {};
  return payments.reduce((totals: Totals, currentPayment: PaymentType) => {
    if (!totals[currentPayment.subject._id])
      totals[currentPayment.subject._id] = currentPayment.amount;
    else totals[currentPayment.subject._id] += currentPayment.amount;
    return totals;
  }, {});
};

export const getTotalByTag = (payments: PaymentType[]) => {
  if (!payments) return {};
  return payments.reduce((totals: Totals, currentPayment: PaymentType) => {
    if (!currentPayment.tags) return totals;
    currentPayment.tags.forEach((tag: TagType) => {
      if (!totals[tag._id]) totals[tag._id] = currentPayment.amount;
      else totals[tag._id] += currentPayment.amount;
    });
    return totals;
  }, {});
};
