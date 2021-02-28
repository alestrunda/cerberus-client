import React from "react";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NoData from "../../components/NoData";
import PaymentPreview from "../../components/PaymentPreview";
import SectionLoad from "../../components/SectionLoad";
import ExpenseType from "../../interfaces/Expense";
import PaymentName from "../../interfaces/PaymentName";
import { GET_EXPENSES } from "../../gql/expense/queries";
import { Link } from "react-router-dom";

const Expenses = () => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(GET_EXPENSES);
  const records = data ? data.expenses : [];

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <SectionLoad className="box" isError={error !== undefined} isLoading={loading}>
            <div className="box__content">
              <div className="grid">
                <div className="grid__item grid__item--md-span-6">
                  <h1 className="page-title">{t("Expenses")}</h1>
                </div>
                <div className="grid__item grid__item--md-span-6 text-right">
                  <Link className="button button--green" to="/expense/new/">
                    {t("Add new")}
                  </Link>
                </div>
              </div>
              <div className="mb20">
                {!loading && records.length === 0 && <NoData />}
                {records.map((item: ExpenseType) => (
                  <PaymentPreview
                    className="payment--hover"
                    key={item._id}
                    {...item}
                    type={PaymentName.expense}
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

export default Expenses;
