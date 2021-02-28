import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import FormNewPayment from "../../containers/FormNewPayment";
import { ADD_INCOME } from "../../gql/income/mutations";
import { GET_INCOMES } from "../../gql/income/queries";
import PaymentName from "../../interfaces/PaymentName";
import PaymentMutationName from "../../interfaces/PaymentMutationName";
import "react-datepicker/dist/react-datepicker.css";

const IncomeNew = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <div className="box">
            <div className="box__content">
              <h1 className="page-title">{t("New Income")}</h1>
              <FormNewPayment
                createMutation={ADD_INCOME}
                createMutationName={PaymentMutationName.income}
                queriesToUpdate={[{ itemsName: PaymentName.incomes, name: GET_INCOMES }]}
                paymentName={PaymentName.income}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default IncomeNew;
