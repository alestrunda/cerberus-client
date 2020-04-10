import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import BarChart from "../../components/Charts/BarChart";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import PaymentType from "../../interfaces/Payment";
import PieChart from "../../components/Charts/PieChart";
import Record from "../../components/Charts/Record";

const Year = ({ match }: any) => {
  const { loading, error, data } = useQuery(
    gql`
      query($year: Int) {
        incomes(year: $year) {
          _id
          amount
          subject {
            _id
            name
          }
          tags {
            _id
          }
        }
        outlays(year: $year) {
          _id
          amount
          subject {
            _id
            name
          }
          tags {
            _id
          }
        }
        subjects {
          _id
          name
        }
        tags {
          _id
          name
        }
      }
    `,
    {
      variables: { year: parseInt(match.params.year) }
    }
  );

  const getTotals = (payments: PaymentType[]) => {
    const out: Record[] = [];
    payments.forEach((payment: PaymentType) => {
      const subjectRecord = out.find((item: any) => item.label === payment.subject.name);
      if (subjectRecord) {
        subjectRecord.value += payment.amount;
      } else {
        out.push({
          label: payment.subject.name,
          value: payment.amount
        });
      }
    });
    return out;
  };

  const compareRecords = (a: Record, b: Record) => {
    if (a.value === b.value) return a.label.localeCompare(b.label);
    return b.value - a.value;
  };

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <SectionLoad className="box" isError={error !== undefined} isLoading={loading}>
            <div className="box__content">
              {!loading && !error && (
                <div>
                  <h2>Incomes</h2>
                  <BarChart data={getTotals(data.incomes).sort(compareRecords)} color="#36af46" />
                  <PieChart data={getTotals(data.incomes)} />
                  <hr className="mt30 mb30" />
                  <h2>Outlays</h2>
                  <BarChart data={getTotals(data.outlays).sort(compareRecords)} color="#d54642" />
                  <PieChart data={getTotals(data.outlays)} />
                  <div className="m20"></div>
                </div>
              )}
            </div>
          </SectionLoad>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Year;
