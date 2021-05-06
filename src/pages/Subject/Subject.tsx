import React from "react";
import { useTranslation } from "react-i18next";
import { gql, useQuery } from "@apollo/client";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Price from "../../components/Price";
import RowAttribute from "../../components/RowAttribute";
import SectionLoad from "../../components/SectionLoad";
import SubjectType from "../../interfaces/Subject";
import NoData from "../../components/NoData";
import NotFound from "../../components/NotFound";
import BarChart from "../../components/Charts/BarChart";
import { filterPaymentsBySubject, getPaymentsByYears } from "../../misc/misc";
import { COLOR_RED, COLOR_GREEN } from "../../constants";

const Subject = ({ match }: any) => {
  const { loading, error, data } = useQuery(gql`
    query {
      incomes {
        _id
        amount
        date
        subject {
          _id
          name
        }
      }
      expenses {
        _id
        amount
        date
        subject {
          _id
          name
        }
      }
      subjects {
        _id
        name
      }
    }
  `);
  const { t } = useTranslation();

  const subject = data?.subjects.find((record: SubjectType) => record._id === match.params.id);

  const incomesByYear = subject
    ? getPaymentsByYears(filterPaymentsBySubject(data.incomes, subject._id))
    : new Map();
  const expensesByYear = subject
    ? getPaymentsByYears(filterPaymentsBySubject(data.expenses, subject._id))
    : new Map();

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <SectionLoad isError={error !== undefined} isLoading={loading}>
            <>
              {!loading && !error && (
                <div className="box">
                  <div className="box__content">
                    {!subject ? (
                      <NotFound />
                    ) : (
                      <>
                        <h1 className="mb15 text-center">{subject.name}</h1>
                        <div className="grid mb10">
                          <div className="grid__item grid__item--md-span-6">
                            <h2 className="mb10 text-center">{t("Incomes")}</h2>
                            {!incomesByYear.size && <NoData />}
                            {Array.from(incomesByYear.keys()).map((key) => (
                              <RowAttribute key={key} title={key}>
                                <Price>{incomesByYear.get(key).total}</Price>
                              </RowAttribute>
                            ))}
                          </div>
                          <div className="grid__item grid__item--md-span-6">
                            <h2 className="mb10 text-center">{t("Expenses")}</h2>
                            {!expensesByYear.size && <NoData />}
                            {Array.from(expensesByYear.keys()).map((key) => (
                              <RowAttribute key={key} title={key}>
                                <Price>{expensesByYear.get(key).total}</Price>
                              </RowAttribute>
                            ))}
                          </div>
                        </div>
                        {incomesByYear.size > 0 && (
                          <BarChart
                            data={Array.from(incomesByYear.keys()).map((year: string) => ({
                              label: year,
                              value: incomesByYear.get(year).total
                            }))}
                            color={COLOR_GREEN}
                          />
                        )}
                        {expensesByYear.size > 0 && (
                          <BarChart
                            data={Array.from(expensesByYear.keys()).map((year: string) => ({
                              label: year,
                              value: expensesByYear.get(year).total
                            }))}
                            color={COLOR_RED}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          </SectionLoad>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Subject;
