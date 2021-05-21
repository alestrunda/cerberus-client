import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import FormNewPayment from "../../containers/FormNewPayment";
import { ADD_DEBT } from "../../gql/debt/mutations";
import { GET_DEBTS } from "../../gql/debt/queries";
import PaymentName from "../../interfaces/PaymentName";
import PaymentMutationName from "../../interfaces/PaymentMutationName";
import "react-datepicker/dist/react-datepicker.css";

const DebtNew = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <div className="box">
            <div className="box__content">
              <h1 className="page-title">{t("New Debt")}</h1>
              <FormNewPayment
                createMutation={ADD_DEBT}
                createMutationName={PaymentMutationName.debt}
                queriesToUpdate={[{ itemsName: PaymentName.debts, name: GET_DEBTS }]}
                paymentName={PaymentName.debt}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DebtNew;
