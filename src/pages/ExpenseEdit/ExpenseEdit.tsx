import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import FormEditPayment from "../../containers/FormEditPayment";
import { EDIT_EXPENSE } from "../../gql/expense/mutations";
import { GET_EXPENSE, REMOVE_EXPENSE, GET_EXPENSES } from "../../gql/expense/queries";
import PaymentName from "../../interfaces/PaymentName";

const ExpenseEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(GET_EXPENSE, {
    variables: { id }
  });

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <SectionLoad isError={error !== undefined} isLoading={loading}>
            <div className="box">
              <div className="box__content">
                <h1 className="mb20">{t("Edit Expense")}</h1>
                {data && (
                  <FormEditPayment
                    editMutation={EDIT_EXPENSE}
                    queriesToUpdateOnDelete={[
                      { itemsName: PaymentName.expenses, name: GET_EXPENSES }
                    ]}
                    payment={data.expense}
                    paymentName={PaymentName.expense}
                    paymentsName={PaymentName.expenses}
                    removeMutation={REMOVE_EXPENSE}
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

export default ExpenseEdit;
