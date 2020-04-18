import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PaymentPreview from "../../components/PaymentPreview";
import SectionLoad from "../../components/SectionLoad";
import OutlayType from "../../interfaces/Outlay";
import PaymentName from "../../interfaces/PaymentName";
import { GET_OUTLAYS } from "../../gql/outlay/queries";
import { Link } from "react-router-dom";

const Outlays = () => {
  const { loading, error, data } = useQuery(GET_OUTLAYS);

  const records = data ? data.outlays : [];

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <SectionLoad className="box" isError={error !== undefined} isLoading={loading}>
            <div className="box__content">
              <div className="grid">
                <div className="grid__item grid__item--md-span-6">
                  <h1 className="page-title">Outlays</h1>
                </div>
                <div className="grid__item grid__item--md-span-6 text-right">
                  <Link className="button button--green" to="/outlay/new/">
                    Add new
                  </Link>
                </div>
              </div>
              <div className="mb20">
                {!loading && records.length === 0 && <p>No data yet</p>}
                {records.map((item: OutlayType) => (
                  <PaymentPreview
                    className="payment--hover"
                    key={item._id}
                    {...item}
                    type={PaymentName.outlay}
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

export default Outlays;
