import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import BarChart from "../../components/Charts/BarChart";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import PieChart from "../../components/Charts/PieChart";
import { compareChartRecords, getChartTotalsBySubject } from "../../misc/chart";
import { COLOR_RED } from "../../constants";
import { getTotalBySubject, sortByTotal } from "../../misc/total";
import RowAttribute from "../../components/RowAttribute";
import Price from "../../components/Price";

const ExpensesYear = () => {
  const { year }: any = useParams();
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(
    gql`
      query ($year: Int) {
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

  const subjectsExpensesTotal = data ? getTotalBySubject(data.expenses) : {};
  const subjectsExpensesSorted = data
    ? sortByTotal(data.subjects, subjectsExpensesTotal).filter(
        (subject) => !!subjectsExpensesTotal[subject._id]
      )
    : [];

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

                  {subjectsExpensesSorted.map((subject) => (
                    <RowAttribute
                      className="row-attr--expense"
                      key={subject._id}
                      title={subject.name}
                      to={`/subject/${subject._id}`}
                    >
                      <Price className="text-expense">
                        {subjectsExpensesTotal[subject._id] || 0}
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

export default ExpensesYear;
