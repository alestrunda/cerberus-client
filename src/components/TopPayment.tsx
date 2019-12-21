import React from "react";
import Price from "./Price";
import DebtType from "../interfaces/Debt";
import IncomeType from "../interfaces/Income";
import OutlayType from "../interfaces/Outlay";

interface Props {
  payment: DebtType | IncomeType | OutlayType | undefined;
}

const TopPayment = ({ payment }: Props) => {
  if (!payment) return null;
  return (
    <div className="row-attr">
      <div className="row-attr__title">Top:</div>
      <div className="row-attr__val">
        <i>{payment.subject.name}</i> for <Price className="text-bold">{payment.amount}</Price>
      </div>
    </div>
  );
};

export default TopPayment;
