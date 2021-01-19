import ChartRecord from "../interfaces/ChartRecord";
import PaymentType from "../interfaces/Payment";

export const compareChartRecords = (a: ChartRecord, b: ChartRecord) =>
  a.value === b.value ? a.label.localeCompare(b.label) : b.value - a.value;

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
