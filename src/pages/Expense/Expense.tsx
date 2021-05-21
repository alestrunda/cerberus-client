import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import PaymentSingle from "../../components/PaymentSingle";
import { Link } from "react-router-dom";
import { GET_EXPENSE } from "../../gql/expense/queries";

const Expense = ({ match }: any) => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(GET_EXPENSE, {
    variables: { id: match.params.id }
  });

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <SectionLoad isError={error !== undefined} isLoading={loading}>
            <>
              {!loading && !error && (
                <>
                  <div className="box">
                    <PaymentSingle {...data.expense} />
                  </div>
                  <div className="text-right">
                    <Link
                      to={`/expense/${data.expense._id}/edit/`}
                      className="button button--green"
                    >
                      {t("Edit")}
                    </Link>
                  </div>
                </>
              )}
            </>
          </SectionLoad>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Expense;
