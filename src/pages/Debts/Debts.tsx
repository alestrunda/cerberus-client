import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NoData from "../../components/NoData";
import PaymentPreview from "../../components/PaymentPreview";
import SectionLoad from "../../components/SectionLoad";
import DebtType from "../../interfaces/Debt";
import PaymentName from "../../interfaces/PaymentName";
import { GET_DEBTS } from "../../gql/debt/queries";

const Debts = () => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(GET_DEBTS);

  const records = data ? [...data.debts].sort((a, b) => a.isPaid - b.isPaid) : [];

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <SectionLoad className="box" isError={error !== undefined} isLoading={loading}>
            <div className="box__content">
              <div className="grid">
                <div className="grid__item grid__item--md-span-6">
                  <h1 className="page-title">{t("Debts")}</h1>
                </div>
                <div className="grid__item grid__item--md-span-6 text-right">
                  <Link className="button button--green" to="/debt/new/">
                    {t("Add new")}
                  </Link>
                </div>
              </div>
              <div className="mb10">
                {!loading && records.length === 0 && <NoData />}
                {records.map((item: DebtType) => (
                  <PaymentPreview
                    className="payment--hover"
                    key={item._id}
                    {...item}
                    type={PaymentName.debt}
                  />
                ))}
              </div>
            </div>
          </SectionLoad>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Debts;
