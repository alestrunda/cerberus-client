import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import FormNewPayment from "../../containers/FormNewPayment";
import { ADD_EXPENSE } from "../../gql/expense/mutations";
import { GET_EXPENSES } from "../../gql/expense/queries";
import PaymentName from "../../interfaces/PaymentName";
import PaymentMutationName from "../../interfaces/PaymentMutationName";

import "react-datepicker/dist/react-datepicker.css";

const ExpenseNew = () => (
  <>
    <Header />
    <main className="page-content">
      <div className="container container--small">
        <div className="box">
          <div className="box__content">
            <h1 className="page-title">New Expense</h1>
            <FormNewPayment
              createMutation={ADD_EXPENSE}
              createMutationName={PaymentMutationName.expense}
              queriesToUpdate={[{ itemsName: PaymentName.expenses, name: GET_EXPENSES }]}
              paymentName={PaymentName.expense}
            />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default ExpenseNew;
