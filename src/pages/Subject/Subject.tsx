import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Price from "../../components/Price";
import RowAttribute from "../../components/RowAttribute";
import SectionLoad from "../../components/SectionLoad";
import PaymentType from "../../interfaces/Payment";
import PaymentTotals from "../../interfaces/PaymentTotals";
import SubjectType from "../../interfaces/Subject";

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
      outlays {
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
  const outlaysByYear = subject
    ? getPaymentsByYears(filterPaymentsBySubject(data.outlays, subject._id))
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
                      <p className="text-red">Not found</p>
                    ) : (
                      <>
                        <h1 className="mb10">{subject.name}</h1>
                        <div className="grid">
                          <div className="grid__item grid__item--md-span-6">
                            <h2 className="mb10">Incomes</h2>
                            {Object.keys(incomesByYear).map(key => (
                              <RowAttribute title={key}>
                                <Price>{incomesByYear[key].total}</Price>
                              </RowAttribute>
                            ))}
                          </div>
                          <div className="grid__item grid__item--md-span-6">
                            <h2 className="mb10">Outlays</h2>
                            {Object.keys(outlaysByYear).map(key => (
                              <RowAttribute title={key}>
                                <Price>{outlaysByYear[key].total}</Price>
                              </RowAttribute>
                            ))}
                          </div>
                        </div>
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
