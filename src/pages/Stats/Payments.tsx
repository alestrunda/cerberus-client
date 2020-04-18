import React from "react";
import DebtType from "../../interfaces/Debt";
import IncomeType from "../../interfaces/Income";
import { YEARS_TO_IGNORE } from "../../constants";
import { getAverage, getMax } from "../../payment";
import RowAttribute from "../../components/RowAttribute";
import Price from "../../components/Price";
import PaymentTop from "../../components/PaymentTop";
import Row from "./Row";
import { sortStringDesc, recountForWholeYear } from "../../misc";

interface Props {
  payments: (DebtType | IncomeType)[];
  paymentsByYears: any;
  title: string;
}

const Payments = ({ payments, paymentsByYears, title }: Props) => {
  const maxPayment = getMax(payments);
  const averagePaymentYear = getAverage(paymentsByYears);

  const years = Object.keys(paymentsByYears);

  return (
    <>
      <h2 className="mb15 text-center">
        {title} {`(${payments.length})`}
      </h2>
      <RowAttribute title="Average">
        <Price className="text-bold">{averagePaymentYear}</Price>
      </RowAttribute>
      <hr />
      {years.length === 0 && <p className="text-center">No data</p>}
      {years.sort(sortStringDesc).map((key: string) => {
        const showPercent = !YEARS_TO_IGNORE.includes(key);
        const isCurrentYear = key === new Date().getFullYear().toString();
        const valuePrev = paymentsByYears[parseInt(key) - 1]?.total || 0;
        const valueCurrent = paymentsByYears[key]?.total || 0;
        return (
          <React.Fragment key={key}>
            <Row
              current={valueCurrent}
              previous={valuePrev}
              showPercent={isCurrentYear ? false : showPercent}
              title={isCurrentYear ? `${key} (current)` : key}
              to={`/stats/${title.toLowerCase()}/${key}`}
            />
            {isCurrentYear && (
              <Row
                current={recountForWholeYear(valueCurrent)}
                key={`${key}-expected`}
                previous={valuePrev}
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
