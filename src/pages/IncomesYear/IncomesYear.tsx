import { useTranslation } from "react-i18next";
import { gql, useQuery } from "@apollo/client";
import BarChart from "../../components/Charts/BarChart";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import PieChart from "../../components/Charts/PieChart";
import { compareChartRecords, getChartTotalsBySubject } from "../../misc/chart";
import { COLOR_GREEN } from "../../constants";

const IncomesYear = ({ match }: any) => {
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
      }
    `,
    {
      variables: { year: parseInt(match.params.year) }
    }
  );
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <SectionLoad className="box" isError={error !== undefined} isLoading={loading}>
            <div className="box__content">
              <h2 className="mb15">{t("Incomes")}</h2>
              {!loading && !error && (
                <>
                  <BarChart
                    data={getChartTotalsBySubject(data.incomes).sort(compareChartRecords)}
                    color={COLOR_GREEN}
                  />
                  <PieChart data={getChartTotalsBySubject(data.incomes)} />
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

export default IncomesYear;
