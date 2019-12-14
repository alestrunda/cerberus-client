import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SectionLoad from "../components/SectionLoad";
import DebtType from "../interfaces/Debt";
import IncomeType from "../interfaces/Income";
import OutlayType from "../interfaces/Outlay";
import Price from "../components/Price";
import { YEARS_TO_IGNORE } from "../constants";
import { sortStrDesc } from "../misc";

interface PaymentTotals {
  [key: string]: {
    items: [DebtType | IncomeType | OutlayType];
    total: number;
  };
}

const Stats = () => {
  const { loading, error, data } = useQuery(gql`
    query {
      debts {
        _id
        amount
        date
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

  const debtsByYears = data
    ? data.debts.reduce((total: PaymentTotals, item: DebtType) => {
        const year = new Date(item.date).getFullYear();
        if (total[year]) {
          total[year].items.push(item);
          total[year].total += item.amount;
        } else {
          total[year] = { items: [item], total: item.amount };
        }
        return total;
      }, {})
    : {};

  const incomesByYears = data
    ? data.incomes.reduce((total: PaymentTotals, item: IncomeType) => {
        const year = new Date(item.date).getFullYear();
        if (total[year]) {
          total[year].items.push(item);
          total[year].total += item.amount;
        } else {
          total[year] = { items: [item], total: item.amount };
        }
        return total;
      }, {})
    : {};

  const outlaysByYears = data
    ? data.outlays.reduce((total: PaymentTotals, item: OutlayType) => {
        const year = new Date(item.date).getFullYear();
        if (total[year]) {
          total[year].items.push(item);
          total[year].total += item.amount;
        } else {
          total[year] = { items: [item], total: item.amount };
        }
        return total;
      }, {})
    : {};

  const getAverage = (paymentsByYears: PaymentTotals) => {
    const keys = Object.keys(paymentsByYears).filter(
      (key: string) => !YEARS_TO_IGNORE.includes(key)
    );
    if (keys.length === 0) return 0;
    return Math.round(
      keys.reduce((total: number, key: string) => total + paymentsByYears[key].total, 0) /
        keys.length
    );
  };

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <SectionLoad className="box" isError={error !== undefined} isLoading={loading}>
            <div className="box__content">
              <h1 className="mb25 text-center">Stats</h1>
              <div className="grid grid--big grid--center">
                <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 mb20">
                  <h2 className="mb15 text-center">Debts {data && `(${data.debts.length})`}</h2>
                  <div className="row-attr">
                    <div className="row-attr__title">Average:</div>
                    <div className="row-attr__val">
                      <Price>{getAverage(debtsByYears)}</Price>
                    </div>
                  </div>
                  <hr />
                  {Object.keys(debtsByYears).length === 0 && <p className="text-center">No data</p>}
                  {Object.keys(debtsByYears)
                    .sort(sortStrDesc)
                    .map((key: string) => (
                      <div className="row-attr" key={key}>
                        <div className="row-attr__title">{key}: </div>
                        <div className="row-attr__val">
                          <Price>{debtsByYears[key].total}</Price>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 mb20">
                  <h2 className="mb15 text-center">Incomes {data && `(${data.incomes.length})`}</h2>
                  <div className="row-attr">
                    <div className="row-attr__title">Average:</div>
                    <div className="row-attr__val">
                      <Price>{getAverage(incomesByYears)}</Price>
                    </div>
                  </div>
                  <hr />
                  {Object.keys(incomesByYears).length === 0 && (
                    <p className="text-center">No data</p>
                  )}
                  {Object.keys(incomesByYears)
                    .sort(sortStrDesc)
                    .map((key: string) => (
                      <div className="row-attr" key={key}>
                        <div className="row-attr__title">{key}: </div>
                        <div className="row-attr__val">
                          <Price>{incomesByYears[key].total}</Price>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 mb20">
                  <h2 className="mb15 text-center">Outlays {data && `(${data.outlays.length})`}</h2>
                  <div className="row-attr">
                    <div className="row-attr__title">Average:</div>
                    <div className="row-attr__val">
                      <Price>{getAverage(outlaysByYears)}</Price>
                    </div>
                  </div>
                  <hr />
                  {Object.keys(outlaysByYears).length === 0 && (
                    <p className="text-center">No data</p>
                  )}
                  {Object.keys(outlaysByYears)
                    .sort(sortStrDesc)
                    .map((key: string) => (
                      <div className="row-attr" key={key}>
                        <div className="row-attr__title">{key}: </div>
                        <div className="row-attr__val">
                          <Price>{outlaysByYears[key].total}</Price>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </SectionLoad>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Stats;
