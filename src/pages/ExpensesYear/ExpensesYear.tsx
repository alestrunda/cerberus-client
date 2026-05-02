import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import BarChart from "../../components/Charts/BarChart";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import PieChart from "../../components/Charts/PieChart";
import {
  compareChartRecords,
  getChartTotalsBySubject,
  getChartTotalsByMonth
} from "../../misc/chart";
import { COLOR_RED } from "../../constants";
import { getTotalBySubject, getTotalByTag, sortByTotal } from "../../misc/total";
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
          date
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
      variables: { year: parseInt(year) }
    }
  );

  const subjectsExpensesTotal = data ? getTotalBySubject(data.expenses) : {};
  const subjectsExpensesSorted = data
    ? sortByTotal(data.subjects, subjectsExpensesTotal).filter(
        (subject) => !!subjectsExpensesTotal[subject._id]
      )
    : [];
  const tagsExpensesTotal = data ? getTotalByTag(data.expenses) : {};
  const tagsExpensesSorted = data
    ? sortByTotal(data.tags, tagsExpensesTotal).filter((tag) => !!tagsExpensesTotal[tag._id])
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
                  <BarChart data={getChartTotalsByMonth(data.expenses)} color={COLOR_RED} />

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
                  <hr className="mt20 mb20" />
                  {tagsExpensesSorted.map((tag) => (
                    <RowAttribute
                      className="row-attr--expense"
                      key={tag._id}
                      title={tag.name}
                      to={`/tag/${tag._id}`}
                    >
                      <Price className="text-expense">{tagsExpensesTotal[tag._id] || 0}</Price>
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
