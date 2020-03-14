import React from "react";
import Price from "./Price";
import DebtType from "../interfaces/Debt";
import IncomeType from "../interfaces/Income";
import OutlayType from "../interfaces/Outlay";
import RowAttribute from "./RowAttribute";

interface Props {
  payment: DebtType | IncomeType | OutlayType | undefined;
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
