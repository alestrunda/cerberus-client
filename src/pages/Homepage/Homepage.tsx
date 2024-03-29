import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Price from "../../components/Price";
import SectionLoad from "../../components/SectionLoad";
import DebtType from "../../interfaces/Debt";
import { getPaymentsTotal, getPaymentsTotalByYear } from "../../misc/total";

const Homepage = () => {
  const { loading, error, data } = useQuery(gql`
    query {
      debts {
        _id
        amount
        isPaid
        subject {
          _id
          name
        }
      }
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
    }
  `);
  const { t } = useTranslation();

  const debts = data ? data.debts : [];
  const incomes = data ? data.incomes : [];
  const expenses = data ? data.expenses : [];
  const debtsNotPaid = debts.filter((debt: DebtType) => !debt.isPaid);
  const debtTotal = getPaymentsTotal(debtsNotPaid);

  const latestDebt = debts.length ? debts[0] : undefined;
  const latestIncome = incomes.length ? incomes[0] : undefined;
  const latestExpense = expenses.length ? expenses[0] : undefined;

  const thisYear = new Date().getFullYear();
  const [incomesTotalThisYear, incomesTotalLastYear] = getPaymentsTotalByYear(incomes, thisYear);
  const [expensesTotalThisYear, expensesTotalLastYear] = getPaymentsTotalByYear(expenses, thisYear);

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <SectionLoad
            isError={error !== undefined}
            isLoading={loading}
            loadingText={
              process.env.REACT_APP_SERVER_ENV === "heroku"
                ? t("Server hosted on Heroku, there might be a loading delay due to the cold start")
                : undefined
            }
            styleOverlay={{ height: "auto", bottom: 20 }}
          >
            <div className="grid">
              <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 container-flex">
                <div className="el-full el-relative container-flex">
                  <Link to="/debt/new/" className="label-abs">
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                  <Link to="/debts/" className="box box--debt box--center ">
                    <div className="box__content box__content--big">
                      <h2>
                        {t("Debts")}
                        <br />
                        {debts.length}
                      </h2>
                      <p>
                        <strong>{debtsNotPaid.length}</strong> {t("not paid")}
                      </p>
                      {latestDebt && (
                        <p>
                          {t("latest")}: <i>{latestDebt.subject.name}</i> {t("for")}{" "}
                          <Price className="text-bold">{latestDebt.amount}</Price>
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
              <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 container-flex">
                <div className="el-full el-relative container-flex">
                  <Link to="/income/new/" className="label-abs">
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                  <Link to="/incomes/" className="box box--income box--center">
                    <div className="box__content box__content--big">
                      <h2>
                        {t("Incomes")}
                        <br />
                        {incomes.length}
                      </h2>
                      {latestIncome && (
                        <p>
                          {t("latest")}: <i>{latestIncome.subject.name}</i> {t("for")}{" "}
                          <Price className="text-bold">{latestIncome.amount}</Price>
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
              <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 container-flex">
                <div className="el-full el-relative container-flex">
                  <Link to="/expense/new/" className="label-abs">
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                  <Link to="/expenses/" className="box box--expense box--center">
                    <div className="box__content box__content--big">
                      <h2>
                        {t("Expenses")}
                        <br />
                        {expenses.length}
                      </h2>
                      {latestExpense && (
                        <p>
                          {t("latest")}: <i>{latestExpense.subject.name}</i> {t("for")}{" "}
                          <Price className="text-bold">{latestExpense.amount}</Price>
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
              <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 container-flex">
                <Link to="/stats/" className="box box--debt box--center">
                  <div className="box__content box__content--big">
                    <h2>{t("Debts Total")}</h2>
                    <p>
                      <strong>{debtsNotPaid.length}</strong> {t("not paid")}
                    </p>
                    <p>
                      {t("total")} <Price className="text-bold">{debtTotal}</Price>
                    </p>
                  </div>
                </Link>
              </div>
              <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 container-flex">
                <Link to="/stats/" className="box box--income box--center">
                  <div className="box__content box__content--big">
                    <h2>{t("Incomes difference")}</h2>
                    <p>
                      {t("last year")} <Price className="text-bold">{incomesTotalLastYear}</Price>
                    </p>
                    <p>
                      {t("this year")} <Price className="text-bold">{incomesTotalThisYear}</Price>
                    </p>
                  </div>
                </Link>
              </div>
              <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 container-flex">
                <Link to="/stats/" className="box box--expense box--center">
                  <div className="box__content box__content--big">
                    <h2>{t("Expenses difference")}</h2>
                    <p>
                      {t("last year")} <Price className="text-bold">{expensesTotalLastYear}</Price>
                    </p>
                    <p>
                      {t("this year")} <Price className="text-bold">{expensesTotalThisYear}</Price>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </SectionLoad>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Homepage;
