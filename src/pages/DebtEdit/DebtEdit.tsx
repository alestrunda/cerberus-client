import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import FormEditPayment from "../../containers/FormEditPayment";
import { EDIT_DEBT, REMOVE_DEBT } from "../../gql/debt/mutations";
import { GET_DEBT, GET_DEBTS } from "../../gql/debt/queries";
import PaymentName from "../../interfaces/PaymentName";

const DebtEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(GET_DEBT, {
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
                <h1 className="mb20">{t("Edit Debt")}</h1>
                {data && (
                  <FormEditPayment
                    editMutation={EDIT_DEBT}
                    queriesToUpdateOnDelete={[{ itemsName: PaymentName.debts, name: GET_DEBTS }]}
                    payment={data.debt}
                    paymentName={PaymentName.debt}
                    paymentsName={PaymentName.debts}
                    removeMutation={REMOVE_DEBT}
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

export default DebtEdit;
