import React from "react";
import DebtType from "../../interfaces/Debt";
import IncomeType from "../../interfaces/Income";
import { YEARS_TO_IGNORE } from "../../constants";
import { getAverage, getMax } from "../../payment";
import RowAttribute from "../../components/RowAttribute";
import Price from "../../components/Price";
import PaymentTop from "../../components/PaymentTop";
import RowDifference from "../../components/RowDifference";
import { recountNumberForWholeYear } from "../../misc/misc";
import PaymentTotalsByYear from "../../interfaces/PaymentTotals";

interface Props {
  payments: (DebtType | IncomeType)[];
  paymentsByYears: PaymentTotalsByYear;
  title: string;
}

const Payments = ({ payments, paymentsByYears, title }: Props) => {
  const maxPayment = getMax(payments);
  const averagePaymentYear = getAverage(paymentsByYears);

  const yearsSorted = Array.from(paymentsByYears.keys()).sort().reverse();

  return (
    <>
      <h2 className="mb15 text-center">
        {title} {`(${payments.length})`}
      </h2>
      <RowAttribute title="Average">
        <Price className="text-bold">{averagePaymentYear}</Price>
      </RowAttribute>
      <hr />
      {!paymentsByYears.size && <p className="text-center">No data</p>}
      {yearsSorted.map((key: number) => {
        const showPercent = !YEARS_TO_IGNORE.includes(key);
        const isCurrentYear = key === new Date().getFullYear();
        const valuePrevYear = paymentsByYears.get(key - 1)?.total || 0;
        const valueCurrent = paymentsByYears.get(key)?.total || 0;
        return (
          <React.Fragment key={key}>
            <RowDifference
              current={valueCurrent}
              previous={valuePrevYear}
              showPercent={isCurrentYear ? false : showPercent}
              title={isCurrentYear ? `${key} (current)` : `${key}`}
              to={`/stats/${title.toLowerCase()}/${key}`}
            />
            {isCurrentYear && (
              <RowDifference
                current={recountNumberForWholeYear(valueCurrent)}
                key={`${key}-expected`}
                previous={valuePrevYear}
                showPercent={showPercent}
                title={`${key} (expected)`}
                to={`/stats/${title.toLowerCase()}/${key}`}
              />
            )}
          </React.Fragment>
        );
      })}
      {maxPayment && (
        <>
          <hr />
          <PaymentTop payment={maxPayment} />
        </>
      )}
    </>
  );
};

export default Payments;
