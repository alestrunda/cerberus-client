import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import BarChart from "../../components/Charts/BarChart";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import PaymentType from "../../interfaces/Payment";
import PieChart from "../../components/Charts/PieChart";
import ChartRecord from "../../interfaces/ChartRecord";
import { compareRecords } from "../../misc";

const OutlaysYear = ({ match }: any) => {
  const { loading, error, data } = useQuery(
    gql`
      query($year: Int) {
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
      }
    `,
    {
      variables: { year: parseInt(match.params.year) }
    }
  );

  const getTotals = (payments: PaymentType[]) => {
    const out: ChartRecord[] = [];
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

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <SectionLoad className="box" isError={error !== undefined} isLoading={loading}>
            <div className="box__content">
              <h2 className="mb15">Outlays</h2>
              {!loading && !error && (
                <>
                  <BarChart data={getTotals(data.outlays).sort(compareRecords)} color="#d54642" />
                  <PieChart data={getTotals(data.outlays)} />
                </>
              )}
            </div>
          </SectionLoad>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OutlaysYear;
