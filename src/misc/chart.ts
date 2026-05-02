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

export const getChartTotalsByMonth = (payments: PaymentType[]) => {
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const totals = monthLabels.map((label) => ({ label, value: 0 }));

  payments.forEach((payment: PaymentType) => {
    const monthIndex = new Date(payment.date).getMonth();
    totals[monthIndex].value += payment.amount;
  });

  return totals;
};

export const getChartCountsByMonth = (payments: PaymentType[]) => {
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const counts = monthLabels.map((label) => ({ label, value: 0 }));

  payments.forEach((payment: PaymentType) => {
    const monthIndex = new Date(payment.date).getMonth();
    if (Number.isInteger(monthIndex) && monthIndex >= 0 && monthIndex < counts.length) {
      counts[monthIndex].value += 1;
    }
  });

  return counts;
};
