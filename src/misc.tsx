import PaymentType from "./interfaces/Payment";
import { DAYS_IN_YEAR } from "./constants";
import { currencySymbolAfter, currencySymbolBefore } from "./config";
import ChartRecord from "./interfaces/ChartRecord";

const YEAR_MS = 86400000;

export const getDateString = (date: number) => new Date(date).toLocaleDateString("cs-CZ");

export const formatPrice = (amount: number) =>
  addCurrency(amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));

export const addCurrency = (amount: number | string) =>
  `${currencySymbolBefore}${amount} ${currencySymbolAfter}`;

export const getLatestPayment = (data: PaymentType[]) =>
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

export const sortStringDesc = (a: string, b: string) => b.localeCompare(a);

export const getNumberOfDaysPassedThisYear = () => {
  const startOfTheYear = new Date(`1.1.${new Date().getFullYear().toString()}`).getTime();
  return Math.floor((new Date().getTime() - startOfTheYear) / YEAR_MS);
};

export const compareByKey = (a: any, b: any, key: string) => a[key] - b[key];

export const compareRecords = (a: ChartRecord, b: ChartRecord) =>
  a.value === b.value ? a.label.localeCompare(b.label) : b.value - a.value;

export const recountNumberForWholeYear = (value: number) => {
  const daysCnt = getNumberOfDaysPassedThisYear();
  return Math.round((daysCnt ? value / getNumberOfDaysPassedThisYear() : value) * DAYS_IN_YEAR);
};

export const getChartTotalsBySubject = (payments: PaymentType[]) => {
  const out: ChartRecord[] = [];
  payments.forEach((payment: PaymentType) => {
    const subjectRecord = out.find((item: any) => item.label === payment.subject.name);
    if (subjectRecord) {
      subjectRecord.value += payment.amount;
    } else {
      out.push({
        label: payment.subject.name,
        value: payment.amount
      });
    }
  });
  return out;
};

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
