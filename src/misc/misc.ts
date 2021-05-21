import DebtType from "../interfaces/Debt";
import PaymentType from "../interfaces/Payment";
import PaymentTotalsByYear from "../interfaces/PaymentTotals";
import { DATE_LOCALE, DAYS_IN_YEAR } from "../constants";
import { currencySymbolAfter, currencySymbolBefore } from "../config";

const YEAR_IN_MS = 86400000;

export const getDateString = (date: number) => new Date(date).toLocaleDateString(DATE_LOCALE);

export const formatPrice = (amount: number) =>
  addCurrency(amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));

export const addCurrency = (amount: number | string) =>
  `${currencySymbolBefore}${amount} ${currencySymbolAfter}`;

export const getLatestPayment = (data: PaymentType[]) =>
  data.reduce((last: PaymentType | undefined, current: PaymentType) => {
    return !last || current.date > last.date ? current : last;
  }, undefined);

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const parseFloatSave = (str: string) => {
  const number = parseFloat(str);
  return isNaN(number) ? 0 : number;
};

export const parseIntSafe = (str: string) => {
  const number = parseInt(str);
  return isNaN(number) ? 0 : number;
};

export const slugify = (str: string) => str.replace(/ /g, "-").toLowerCase();

export const sortStringDesc = (a: string, b: string) => b.localeCompare(a);

export const getNumberOfDaysPassedThisYear = () => {
  const startOfTheYear = new Date(`1.1.${new Date().getFullYear().toString()}`).getTime();
  return Math.floor((new Date().getTime() - startOfTheYear) / YEAR_IN_MS);
};

export const compareByKey = (a: any, b: any, key: string) => a[key] - b[key];

export const compareDebts = (a: DebtType, b: DebtType) => {
  const isPaidCompare = (a.isPaid ? 1 : 0) - (b.isPaid ? 1 : 0);
  if (isPaidCompare !== 0) return isPaidCompare;
  if (!a.isPaid && b.isPaid) return -1;
  const nameCompare = a.subject.name.localeCompare(b.subject.name);
  if (nameCompare !== 0) return nameCompare;
  return b.date - a.date;
};

export const recountNumberForWholeYear = (value: number) => {
  const daysCnt = getNumberOfDaysPassedThisYear();
  return Math.round((daysCnt ? value / getNumberOfDaysPassedThisYear() : value) * DAYS_IN_YEAR);
};

export const getPaymentsByYears = (payments: PaymentType[]) => {
  return payments.reduce((total: PaymentTotalsByYear, item: PaymentType) => {
    const year = new Date(item.date).getFullYear();
    const totalsByYear = total.get(year);
    if (totalsByYear) {
      totalsByYear.items.push(item);
      totalsByYear.total += item.amount;
    } else {
      total.set(year, { items: [item], total: item.amount });
    }
    return total;
  }, new Map());
};

export const filterPaymentsBySubject = (payments: PaymentType[], subjectID: string) =>
  payments.filter((payment: PaymentType) => payment.subject._id === subjectID);

export const filterPaymentsByTag = (payments: PaymentType[], tagID: string) =>
  payments.filter(
    (payment: PaymentType) => payment.tags.findIndex((tag) => tag._id === tagID) !== -1
  );

export const debtToString = (debt: DebtType) =>
  `${debt.subject.name}, ${formatPrice(debt.amount)}, ${getDateString(debt.date)}`;
