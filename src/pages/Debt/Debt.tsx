import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import PaymentSingle from "../../components/PaymentSingle";
import { GET_DEBT } from "../../gql/debt/queries";

const Debt = ({ match }: any) => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(GET_DEBT, {
    variables: { id: match.params.id }
  });

  const isPaid = !!data?.debt.isPaid;

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <SectionLoad isError={error !== undefined} isLoading={loading}>
            <>
              {!loading && !error && (
                <>
                  <div
                    className={classNames("box", {
                      "box--green": isPaid,
                      "box--red": !isPaid
                    })}
                  >
                    <div className="box__icon">
                      <FontAwesomeIcon icon={isPaid ? faCheckCircle : faBan} />
                    </div>
                    <PaymentSingle {...data.debt} />
                  </div>
                  <div className="text-right">
                    <Link to={`/debt/${data.debt._id}/edit/`} className="button button--green">
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

export default Debt;
