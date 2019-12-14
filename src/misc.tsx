import PaymentType from "./interfaces/Payment";
import { currencySymbolAfter, currencySymbolBefore } from "./config";

export const getDateString = (date: number) => new Date(date).toLocaleDateString("cs-CZ");

export const formatPrice = (amount: number) =>
  addCurrency(amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));

export const addCurrency = (amount: number | string) =>
  `${currencySymbolBefore}${amount} ${currencySymbolAfter}`;

export const getLatestPayment = (data: [PaymentType]) =>
  data.reduce((last: PaymentType | undefined, current: PaymentType) => {
    return !last || current.date > last.date ? current : last;
  }, undefined);

export const firstCap = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const parseFloatSave = (str: string) => {
  const number = parseFloat(str);
  return isNaN(number) ? 0 : number;
};

export const parseIntSave = (str: string) => {
  const number = parseInt(str);
  return isNaN(number) ? 0 : number;
};

export const slugify = (str: string) => str.replace(/ /g, "-").toLowerCase();

export const sortStrDesc = (a: string, b: string) => b.localeCompare(a);
