import React from "react";
import { useQuery } from "@apollo/client";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import PaymentSingle from "../../components/PaymentSingle";
import { Link } from "react-router-dom";
import { GET_OUTLAY } from "../../gql/outlay/queries";

const Outlay = ({ match }: any) => {
  const { loading, error, data } = useQuery(GET_OUTLAY, {
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
                    <PaymentSingle {...data.outlay} />
                  </div>
                  <div className="text-right">
                    <Link to={`/outlay/${data.outlay._id}/edit/`} className="button button--green">
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

export default Outlay;
