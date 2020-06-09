import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import BarChart from "../../components/Charts/BarChart";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import PieChart from "../../components/Charts/PieChart";
import { compareRecords, getChartTotalsBySubject } from "../../misc";

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
                  <BarChart
                    data={getChartTotalsBySubject(data.outlays).sort(compareRecords)}
                    color="#d54642"
                  />
                  <PieChart data={getChartTotalsBySubject(data.outlays)} />
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
