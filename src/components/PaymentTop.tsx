import React from "react";
import Price from "./Price";
import DebtType from "../interfaces/Debt";
import IncomeType from "../interfaces/Income";
import ExpenseType from "../interfaces/Expense";
import RowAttribute from "./RowAttribute";

interface Props {
  payment: DebtType | IncomeType | ExpenseType | undefined;
}

const PaymentTop = ({ payment }: Props) => {
  if (!payment) return null;
  return (
    <RowAttribute title="Top">
      <i>{payment.subject.name}</i> for <Price className="text-bold">{payment.amount}</Price>
    </RowAttribute>
  );
};

export default PaymentTop;
