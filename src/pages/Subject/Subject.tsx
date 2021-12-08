import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Expenses from "./Expenses";
import Incomes from "./Incomes";
import BarChart from "../../components/Charts/BarChart";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NoData from "../../components/NoData";
import NotFound from "../../components/NotFound";
import Price from "../../components/Price";
import RowAttribute from "../../components/RowAttribute";
import SectionLoad from "../../components/SectionLoad";
import ExpenseType from "../../interfaces/Expense";
import IncomeType from "../../interfaces/Income";
import SubjectType from "../../interfaces/Subject";
import { filterPaymentsBySubject, getPaymentsByYears } from "../../misc/misc";
import { COLOR_RED, COLOR_GREEN } from "../../constants";

const Subject = () => {
  const { id } = useParams();
  const { t } = useTranslation();
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
      expenses {
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

  const subject = data?.subjects.find((record: SubjectType) => record._id === id);

  const subjectIncomes = subject
    ? (filterPaymentsBySubject(data?.incomes || [], subject._id) as IncomeType[])
    : [];
  const incomesByYear = subject ? getPaymentsByYears(subjectIncomes) : new Map();

  const subjectExpenses = subject
    ? (filterPaymentsBySubject(data?.expenses || [], subject._id) as ExpenseType[])
    : [];
  const expensesByYear = subject ? getPaymentsByYears(subjectExpenses) : new Map();

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <SectionLoad isError={error !== undefined} isLoading={loading}>
            <div className="box">
              <div className="box__content">
                {!error && !loading && !subject && <NotFound />}
                {subject && (
                  <>
                    <h1 className="mb15 text-center">{subject.name}</h1>
                    <div className="grid mb10">
                      <div className="grid__item grid__item--md-span-6">
                        <h2 className="mb10 text-center">{t("Incomes")}</h2>
                        {!incomesByYear.size && <NoData />}
                        {Array.from(incomesByYear.keys()).map((key) => (
                          <RowAttribute key={key} title={key}>
                            <Price>{incomesByYear.get(key).total}</Price>
                          </RowAttribute>
                        ))}
                      </div>
                      <div className="grid__item grid__item--md-span-6">
                        <h2 className="mb10 text-center">{t("Expenses")}</h2>
                        {!expensesByYear.size && <NoData />}
                        {Array.from(expensesByYear.keys()).map((key) => (
                          <RowAttribute key={key} title={key}>
                            <Price>{expensesByYear.get(key).total}</Price>
                          </RowAttribute>
                        ))}
                      </div>
                    </div>
                    {incomesByYear.size > 0 && (
                      <BarChart
                        data={Array.from(incomesByYear.keys()).map((year: string) => ({
                          label: year,
                          value: incomesByYear.get(year).total
                        }))}
                        color={COLOR_GREEN}
                      />
                    )}
                    {expensesByYear.size > 0 && (
                      <BarChart
                        data={Array.from(expensesByYear.keys()).map((year: string) => ({
                          label: year,
                          value: expensesByYear.get(year).total
                        }))}
                        color={COLOR_RED}
                      />
                    )}
                    <Incomes data={subjectIncomes} />
                    <Expenses data={subjectExpenses} />
                  </>
                )}
              </div>
            </div>
          </SectionLoad>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Subject;
