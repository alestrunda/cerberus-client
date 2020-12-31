import DebtType from "./Debt";
import IncomeType from "./Income";
import ExpenseType from "./Expense";

export default interface PaymentTotals {
  [key: string]: {
    items: [DebtType | IncomeType | ExpenseType];
    total: number;
  };
}
