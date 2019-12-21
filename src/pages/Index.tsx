import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Price from "../components/Price";
import SectionLoad from "../components/SectionLoad";
import DebtType from "../interfaces/Debt";
import IncomeType from "../interfaces/Income";
import OutlayType from "../interfaces/Outlay";

const Index = () => {
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
      outlays {
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

  const debts = data ? data.debts : [];
  const incomes = data ? data.incomes : [];
  const outlays = data ? data.outlays : [];
  const debtsNotPaid = debts.filter((debt: DebtType) => !debt.isPaid);
  const debtTotal = debtsNotPaid.reduce((total: number, debt: DebtType) => total + debt.amount, 0);

  const latestDebt = debts.length ? debts[0] : undefined;
  const latestIncome = incomes.length ? incomes[0] : undefined;
  const latestOutlay = outlays.length ? outlays[0] : undefined;

  const thisYear = new Date().getFullYear();
  const [incomesTotalThisYear, incomesTotalLastYear] = incomes.reduce(
    (total: [number, number], item: IncomeType) => {
      const itemYear = new Date(item.date).getFullYear();
      if (itemYear === thisYear) {
        return [total[0] + item.amount, total[1]];
      }
      if (itemYear === thisYear - 1) {
        return [total[0], total[1] + item.amount];
      }
      return total;
    },
    [0, 0]
  );
  const [outalysTotalThisYear, outlaysTotalLastYear] = outlays.reduce(
    (total: [number, number], item: OutlayType) => {
      const itemYear = new Date(item.date).getFullYear();
      if (itemYear === thisYear) {
        return [total[0] + item.amount, total[1]];
      }
      if (itemYear === thisYear - 1) {
        return [total[0], total[1] + item.amount];
      }
      return total;
    },
    [0, 0]
  );

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <SectionLoad
            isError={error !== undefined}
            isLoading={loading}
            styleOverlay={{ height: "auto", bottom: 20 }}
          >
            <>
              <div className="grid">
                <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 container-flex">
                  <div className="el-full el-relative container-flex">
                    <Link to="/debt/new/" className="label-abs">
                      <FontAwesomeIcon icon={faPlus} />
                    </Link>
                    <Link to="/debts/" className="box box--debt box--center ">
                      <div className="box__content box__content--big">
                        <h2>
                          Debts
                          <br />
                          {debts.length}
                        </h2>
                        <p>
                          <strong>{debtsNotPaid.length}</strong> not paid
                        </p>
                        {latestDebt && (
                          <p>
                            latest: <i>{latestDebt.subject.name}</i> for{" "}
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
                          Incomes
                          <br />
                          {incomes.length}
                        </h2>
                        {latestIncome && (
                          <p>
                            latest: <i>{latestIncome.subject.name}</i> for{" "}
                            <Price className="text-bold">{latestIncome.amount}</Price>
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 container-flex">
                  <div className="el-full el-relative container-flex">
                    <Link to="/outlay/new/" className="label-abs">
                      <FontAwesomeIcon icon={faPlus} />
                    </Link>
                    <Link to="/outlays/" className="box box--outlay box--center">
                      <div className="box__content box__content--big">
                        <h2>
                          Outlays
                          <br />
                          {outlays.length}
                        </h2>
                        {latestOutlay && (
                          <p>
                            latest: <i>{latestOutlay.subject.name}</i> for{" "}
                            <Price className="text-bold">{latestOutlay.amount}</Price>
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 container-flex">
                  <Link to="/stats/" className="box box--debt box--center">
                    <div className="box__content box__content--big">
                      <h2>Debts Total</h2>
                      <p>
                        <strong>{debtsNotPaid.length}</strong> not paid
                      </p>
                      <p>
                        total <Price className="text-bold">{debtTotal}</Price>
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 container-flex">
                  <Link to="/stats/" className="box box--income box--center">
                    <div className="box__content box__content--big">
                      <h2>Incomes difference</h2>
                      <p>
                        last year <Price className="text-bold">{incomesTotalLastYear}</Price>
                      </p>
                      <p>
                        this year <Price className="text-bold">{incomesTotalThisYear}</Price>
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 container-flex">
                  <Link to="/stats/" className="box box--outlay box--center">
                    <div className="box__content box__content--big">
                      <h2>Outlays difference</h2>
                      <p>
                        last year <Price className="text-bold">{outlaysTotalLastYear}</Price>
                      </p>
                      <p>
                        this year <Price className="text-bold">{outalysTotalThisYear}</Price>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </>
          </SectionLoad>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
