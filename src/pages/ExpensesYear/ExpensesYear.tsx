import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import BarChart from "../../components/Charts/BarChart";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import PieChart from "../../components/Charts/PieChart";
import { compareChartRecords, getChartTotalsBySubject } from "../../misc/chart";
import { COLOR_RED } from "../../constants";

const ExpensesYear = ({ match }: any) => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(
    gql`
      query($year: Int) {
        expenses(year: $year) {
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
              <h2 className="mb15">{t("Expenses")}</h2>
              {!loading && !error && (
                <>
                  <BarChart
                    data={getChartTotalsBySubject(data.expenses).sort(compareChartRecords)}
                    color={COLOR_RED}
                  />
                  <PieChart data={getChartTotalsBySubject(data.expenses)} />
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

export default ExpensesYear;
