import React from "react";
import Price from "../../components/Price";
import RowAttribute from "../../components/RowAttribute";
import IncomeType from "../../interfaces/Income";

const Incomes = ({ data }: { data: IncomeType[] }) => {
  if (!data.length) return null;

  return (
    <>
      <h3 className="mb10">Incomes:</h3>
      {data.map((income: IncomeType) => (
        <RowAttribute
          className="row-attr--income"
          key={income._id}
          title={income.subject.name}
          to={`/income/${income._id}`}
        >
          <Price>{income.amount}</Price>
        </RowAttribute>
      ))}
      <div className="m20"></div>
    </>
  );
};

export default Incomes;
