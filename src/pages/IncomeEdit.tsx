import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SectionLoad from "../components/SectionLoad";
import FormEditPayment from "../containers/FormEditPayment";
import { EDIT_INCOME, REMOVE_INCOME } from "../gql/income/mutations";
import { GET_INCOME, GET_INCOMES } from "../gql/income/queries";
import PaymentName from "../interfaces/PaymentName";

interface Props {
  match: any;
}

const IncomeEdit = ({ match }: Props) => {
  const { loading, error, data } = useQuery(GET_INCOME, {
    variables: { id: match.params.id }
  });

  if (data) {
    data.income.debtID = data.income.debt._id;
  }

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <SectionLoad isError={error !== undefined} isLoading={loading}>
            <div className="box">
              <div className="box__content">
                <h1 className="mb20">Edit income</h1>
                {data && (
                  <FormEditPayment
                    editMutation={EDIT_INCOME}
                    queriesToUpdateOnDelete={[
                      { itemsName: PaymentName.incomes, name: GET_INCOMES }
                    ]}
                    payment={data.income}
                    paymentName={PaymentName.income}
                    paymentsName={PaymentName.incomes}
                    removeMutation={REMOVE_INCOME}
                  />
                )}
              </div>
            </div>
          </SectionLoad>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default IncomeEdit;
