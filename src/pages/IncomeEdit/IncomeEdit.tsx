import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import FormEditPayment from "../../containers/FormEditPayment";
import { EDIT_INCOME, REMOVE_INCOME } from "../../gql/income/mutations";
import { GET_INCOME, GET_INCOMES } from "../../gql/income/queries";
import PaymentName from "../../interfaces/PaymentName";

const IncomeEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(GET_INCOME, {
    variables: { id }
  });

  let dataPayment;
  if (data) {
    dataPayment = { ...data.income };
    dataPayment.debtID = data.income.debt?._id;
  }

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <SectionLoad isError={error !== undefined} isLoading={loading}>
            <div className="box">
              <div className="box__content">
                <h1 className="mb20">{t("Edit Income")}</h1>
                {dataPayment && (
                  <FormEditPayment
                    editMutation={EDIT_INCOME}
                    queryToRefetchOnEdit={GET_INCOME}
                    queriesToUpdateOnDelete={[
                      { itemsName: PaymentName.incomes, name: GET_INCOMES }
                    ]}
                    payment={dataPayment}
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
