import React from "react";
import { gql, useQuery } from "@apollo/client";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Price from "../../components/Price";
import RowAttribute from "../../components/RowAttribute";
import SectionLoad from "../../components/SectionLoad";
import PaymentType from "../../interfaces/Payment";
import PaymentTotals from "../../interfaces/PaymentTotals";
import SubjectType from "../../interfaces/Subject";
import NoData from "../../components/NoData";
import NotFound from "../../components/NotFound";
import BarChart from "../../components/Charts/BarChart";
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

  const getSubject = (subjects: SubjectType[], id: string) =>
    subjects.find((record: SubjectType) => record._id === id);

  const getPaymentsByYears = (payments: PaymentType[]) => {
    return payments.reduce((total: PaymentTotals, item: PaymentType) => {
      const year = new Date(item.date).getFullYear();
      if (total[year]) {
        total[year].items.push(item);
        total[year].total += item.amount;
      } else {
        total[year] = { items: [item], total: item.amount };
      }
      return total;
    }, {});
  };

  const filterPaymentsBySubject = (payments: PaymentType[], subjectID: string) =>
    payments.filter((payment: PaymentType) => payment.subject._id === subjectID);

  const subject = data ? getSubject(data.subjects, match.params.id) : undefined;
  const incomesByYear = subject
    ? getPaymentsByYears(filterPaymentsBySubject(data.incomes, subject._id))
    : {};
  const expensesByYear = subject
    ? getPaymentsByYears(filterPaymentsBySubject(data.expenses, subject._id))
    : {};

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
                            <h2 className="mb10 text-center">Incomes</h2>
                            {!Object.keys(incomesByYear).length && <NoData />}
                            {Object.keys(incomesByYear).map((key) => (
                              <RowAttribute key={key} title={key}>
                                <Price>{incomesByYear[key].total}</Price>
                              </RowAttribute>
                            ))}
                          </div>
                          <div className="grid__item grid__item--md-span-6">
                            <h2 className="mb10 text-center">Expenses</h2>
                            {!Object.keys(expensesByYear).length && <NoData />}
                            {Object.keys(expensesByYear).map((key) => (
                              <RowAttribute key={key} title={key}>
                                <Price>{expensesByYear[key].total}</Price>
                              </RowAttribute>
                            ))}
                          </div>
                        </div>
                        {Object.keys(incomesByYear).length > 0 && (
                          <BarChart
                            data={Object.keys(incomesByYear).map((year: string) => ({
                              label: year,
                              value: incomesByYear[year].total
                            }))}
                            color={COLOR_GREEN}
                          />
                        )}
                        {Object.keys(expensesByYear).length > 0 && (
                          <BarChart
                            data={Object.keys(expensesByYear).map((year: string) => ({
                              label: year,
                              value: expensesByYear[year].total
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
