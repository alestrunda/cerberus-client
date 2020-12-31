import DebtType from "./Debt";
import IncomeType from "./Income";
import ExpenseType from "./Expense";

type PaymentType = DebtType | IncomeType | ExpenseType;

export default PaymentType;
