import React from "react";
import { useQuery } from "@apollo/client";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PaymentPreview from "../../components/PaymentPreview";
import SectionLoad from "../../components/SectionLoad";
import IncomeType from "../../interfaces/Income";
import PaymentName from "../../interfaces/PaymentName";
import { GET_INCOMES } from "../../gql/income/queries";
import { Link } from "react-router-dom";

const Incomes = () => {
  const { loading, error, data } = useQuery(GET_INCOMES);

  const records = data ? data.incomes : [];

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <SectionLoad className="box" isError={error !== undefined} isLoading={loading}>
            <div className="box__content">
              <div className="grid">
                <div className="grid__item grid__item--md-span-6">
                  <h1 className="page-title">Incomes</h1>
                </div>
                <div className="grid__item grid__item--md-span-6 text-right">
                  <Link className="button button--green" to="/income/new/">
                    Add new
                  </Link>
                </div>
              </div>
              <div className="mb20">
                {!loading && records.length === 0 && <p>No data yet</p>}
                {records.map((item: IncomeType) => (
                  <PaymentPreview
                    className="payment--hover"
                    key={item._id}
                    {...item}
                    type={PaymentName.income}
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

export default Incomes;
