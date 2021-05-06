import React from "react";
import Price from "../../components/Price";
import RowAttribute from "../../components/RowAttribute";
import ExpenseType from "../../interfaces/Expense";

const Expenses = ({ data }: { data: ExpenseType[] }) => {
  if (!data.length) return null;

  return (
    <>
      <h3 className="mb10">Expenses:</h3>
      {data.map((income: ExpenseType) => (
        <RowAttribute
          className="row-attr--expense"
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

export default Expenses;
