import DebtType from "./Debt";
import IncomeType from "./Income";
import ExpenseType from "./Expense";

export interface PaymentTotals {
  items: (DebtType | IncomeType | ExpenseType)[];
  total: number;
}

type PaymentTotalsByYear = Map<number, PaymentTotals>;

export default PaymentTotalsByYear;
