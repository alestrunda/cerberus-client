import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import BarChart from "../../components/Charts/BarChart";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NoData from "../../components/NoData";
import SectionLoad from "../../components/SectionLoad";
import { COLOR_RED } from "../../constants";
import RowAttribute from "../../components/RowAttribute";
import Price from "../../components/Price";
import { getChartTotalsByMonth } from "../../misc/chart";

const ExpensesMonth = () => {
  const { t } = useTranslation();
  const { year }: any = useParams();
  const selectedYear = year ? parseInt(year, 10) : new Date().getFullYear();
  const { loading, error, data } = useQuery(
    gql`
      query ($year: Int) {
        expenses(year: $year) {
          _id
          amount
          date
        }
      }
    `,
    {
      variables: { year: selectedYear }
    }
  );

  const monthlyTotals = data ? getChartTotalsByMonth(data.expenses) : [];
  const hasExpenses = data ? data.expenses.length > 0 : false;

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <SectionLoad className="box" isError={error !== undefined} isLoading={loading}>
            <div className="box__content">
              <h2 className="mb15">
                {t("Expenses")} {`(${selectedYear})`}
              </h2>
              {!loading && !error && (
                <>
                  {!hasExpenses && <NoData />}
                  {hasExpenses && (
                    <>
                      <BarChart data={monthlyTotals} color={COLOR_RED} />
                      {monthlyTotals.map((month) => (
                        <RowAttribute
                          className="row-attr--expense"
                          key={month.label}
                          title={month.label}
                        >
                          <Price className="text-expense">{month.value}</Price>
                        </RowAttribute>
                      ))}
                    </>
                  )}
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

export default ExpensesMonth;
