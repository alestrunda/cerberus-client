import Price from "../../components/Price";
import RowAttribute from "../../components/RowAttribute";
import ExpenseType from "../../interfaces/Expense";

const Expenses = ({ data }: { data: ExpenseType[] }) => {
  if (!data.length) return null;

  return (
    <>
      <h3 className="mb10">Expenses:</h3>
      {data.map((expense: ExpenseType) => (
        <RowAttribute
          className="row-attr--expense"
          key={expense._id}
          title={expense.subject.name}
          to={`/expense/${expense._id}`}
        >
          <Price>{expense.amount}</Price>
        </RowAttribute>
      ))}
      <div className="m20"></div>
    </>
  );
};

export default Expenses;
