import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import BarChart from "../../components/Charts/BarChart";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import PieChart from "../../components/Charts/PieChart";
import { compareChartRecords, getChartTotalsBySubject } from "../../misc/chart";
import { COLOR_GREEN } from "../../constants";
import { getTotalBySubject, sortByTotal } from "../../misc/total";
import RowAttribute from "../../components/RowAttribute";
import Price from "../../components/Price";

const IncomesYear = () => {
  const { year }: any = useParams();
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(
    gql`
      query ($year: Int) {
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
        subjects {
          _id
          name
        }
      }
    `,
    {
      variables: { year: parseInt(year) }
    }
  );

  const subjectsIncomesTotal = data ? getTotalBySubject(data.incomes) : {};
  const subjectsIncomesSorted = data
    ? sortByTotal(data.subjects, subjectsIncomesTotal).filter(
        (subject) => !!subjectsIncomesTotal[subject._id]
      )
    : [];

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

                  {subjectsIncomesSorted.map((subject) => (
                    <RowAttribute
                      className="row-attr--income"
                      key={subject._id}
                      title={subject.name}
                      to={`/subject/${subject._id}`}
                    >
                      <Price className="text-income">
                        {subjectsIncomesTotal[subject._id] || 0}
                      </Price>
                    </RowAttribute>
                  ))}
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
