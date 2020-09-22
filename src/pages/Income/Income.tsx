import React from "react";
import { useQuery } from "@apollo/client";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import PaymentSingle from "../../components/PaymentSingle";
import { Link } from "react-router-dom";
import { GET_INCOME } from "../../gql/income/queries";

const Income = ({ match }: any) => {
  const { loading, error, data } = useQuery(GET_INCOME, {
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
                    <PaymentSingle {...data.income} />
                  </div>
                  <div className="text-right">
                    <Link to={`/income/${data.income._id}/edit/`} className="button button--green">
                      Edit
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

export default Income;
