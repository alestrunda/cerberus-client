import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import classNames from "classnames";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PercentDifference from "../components/PercentDifference";
import SectionLoad from "../components/SectionLoad";
import TopPayment from "../components/TopPayment";
import DebtType from "../interfaces/Debt";
import IncomeType from "../interfaces/Income";
import OutlayType from "../interfaces/Outlay";
import SubjectType from "../interfaces/Subject";
import TagType from "../interfaces/Tag";
import Price from "../components/Price";
import { YEARS_TO_IGNORE } from "../constants";
import { sortStrDesc } from "../misc";

interface PaymentsTotals {
  [key: string]: {
    items: [DebtType | IncomeType | OutlayType];
    total: number;
  };
}

type PaymentType = DebtType | IncomeType | OutlayType;

interface Totals {
  [key: string]: number;
}

const Stats = () => {
  const { loading, error, data } = useQuery(gql`
    query {
      incomes {
        _id
        amount
        date
        subject {
          _id
        }
        tags {
          _id
        }
      }
      outlays {
        _id
        amount
        date
        subject {
          _id
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
  `);

  const getAverage = (paymentsByYears: PaymentsTotals) => {
    const keys = Object.keys(paymentsByYears).filter(
      (key: string) => !YEARS_TO_IGNORE.includes(key)
    );
    if (keys.length === 0) return 0;
    return Math.round(
      keys.reduce((total: number, key: string) => total + paymentsByYears[key].total, 0) /
        keys.length
    );
  };

  const getMaxPayment = (payments: PaymentType[]) => {
    if (!payments) return;
    return payments.reduce((maxPayment: PaymentType | undefined, currentPayment: PaymentType) => {
      if (!maxPayment) return currentPayment;
      if (currentPayment.amount > maxPayment.amount) return currentPayment;
      return maxPayment;
    }, undefined);
  };

  const getSubjectsTotal = (payments: PaymentType[]) => {
    if (!payments) return {};
    return payments.reduce((totals: Totals, currentPayment: PaymentType) => {
      if (!totals[currentPayment.subject._id])
        totals[currentPayment.subject._id] = currentPayment.amount;
      else totals[currentPayment.subject._id] += currentPayment.amount;
      return totals;
    }, {});
  };

  const getTagsTotal = (payments: PaymentType[]) => {
    if (!payments) return {};
    return payments.reduce((totals: Totals, currentPayment: PaymentType) => {
      if (!currentPayment.tags) return totals;
      currentPayment.tags.forEach((tag: TagType) => {
        if (!totals[tag._id]) totals[tag._id] = currentPayment.amount;
        else totals[tag._id] += currentPayment.amount;
      });
      return totals;
    }, {});
  };

  const compareBy = (a: any, b: any, key: string) => {
    return a[key] - b[key];
  };

  const sortByTotal = (items: SubjectType[] | TagType[], totals: Totals) => {
    const sorted = [...items];
    sorted.sort((a: SubjectType | TagType, b: SubjectType | TagType) => {
      const aTotal = totals[a._id] || 0;
      const bTotal = totals[b._id] || 0;
      if (aTotal === bTotal) return compareBy(a, b, "name");
      return bTotal - aTotal;
    });
    return sorted;
  };

  const incomesByYears = data
    ? data.incomes.reduce((total: PaymentsTotals, item: IncomeType) => {
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
    ? data.outlays.reduce((total: PaymentsTotals, item: OutlayType) => {
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

  const maxIncome = getMaxPayment(data?.incomes);
  const maxOutlay = getMaxPayment(data?.outlays);

  const averageIncomeYear = getAverage(incomesByYears);
  const averageOutlayYear = getAverage(outlaysByYears);

  const subjectsIncomesTotal = data ? getSubjectsTotal(data.incomes) : {};
  const subjectsOutlaysTotal = data ? getSubjectsTotal(data.outlays) : {};
  const subjectsIncomesSorted = data
    ? sortByTotal(data.subjects, subjectsIncomesTotal).filter(
        (subject: SubjectType) => !!subjectsIncomesTotal[subject._id]
      )
    : [];
  const subjectsOutlaysSorted = data
    ? sortByTotal(data.subjects, subjectsOutlaysTotal).filter(
        (subject: SubjectType) => !!subjectsOutlaysTotal[subject._id]
      )
    : [];

  const tagsIncomesTotal = data ? getTagsTotal(data.incomes) : {};
  const tagsOutlaysTotal = data ? getTagsTotal(data.outlays) : {};
  const tagsIncomesSorted = data
    ? sortByTotal(data.tags, tagsIncomesTotal).filter((tag: TagType) => !!tagsIncomesTotal[tag._id])
    : [];
  const tagsOutlaysSorted = data
    ? sortByTotal(data.tags, tagsOutlaysTotal).filter((tag: TagType) => !!tagsOutlaysTotal[tag._id])
    : [];

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
                  <h2 className="mb15 text-center">Incomes {data && `(${data.incomes.length})`}</h2>
                  <div className="row-attr">
                    <div className="row-attr__title">Average:</div>
                    <div className="row-attr__val">
                      <Price className="text-bold">{averageIncomeYear}</Price>
                    </div>
                  </div>
                  <hr />
                  {Object.keys(incomesByYears).length === 0 && (
                    <p className="text-center">No data</p>
                  )}
                  {Object.keys(incomesByYears)
                    .sort(sortStrDesc)
                    .map((key: string) => (
                      <div className="row-attr row-attr--striped" key={key}>
                        <div className="row-attr__title">{key}: </div>
                        <div className="row-attr__val">
                          {!YEARS_TO_IGNORE.includes(key) && (
                            <PercentDifference
                              className="mr10"
                              value1={averageIncomeYear}
                              value2={incomesByYears[key].total}
                            />
                          )}
                          <Price className="text-bold">{incomesByYears[key].total}</Price>
                        </div>
                      </div>
                    ))}
                  {maxIncome && (
                    <>
                      <hr />
                      <TopPayment payment={maxIncome} />
                    </>
                  )}
                </div>
                <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 mb20">
                  <h2 className="mb15 text-center">Outlays {data && `(${data.outlays.length})`}</h2>
                  <div className="row-attr">
                    <div className="row-attr__title">Average:</div>
                    <div className="row-attr__val">
                      <Price className="text-bold">{averageOutlayYear}</Price>
                    </div>
                  </div>
                  <hr />
                  {Object.keys(outlaysByYears).length === 0 && (
                    <p className="text-center">No data</p>
                  )}
                  {Object.keys(outlaysByYears)
                    .sort(sortStrDesc)
                    .map((key: string) => (
                      <div className="row-attr row-attr--striped" key={key}>
                        <div className="row-attr__title">{key}: </div>
                        <div className="row-attr__val">
                          {!YEARS_TO_IGNORE.includes(key) && (
                            <PercentDifference
                              className="mr10"
                              value1={averageOutlayYear}
                              value2={outlaysByYears[key].total}
                            />
                          )}
                          <Price className="text-bold">{outlaysByYears[key].total}</Price>
                        </div>
                      </div>
                    ))}
                  {maxOutlay && (
                    <>
                      <hr />
                      <TopPayment payment={maxOutlay} />
                    </>
                  )}
                </div>
                <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 mb20">
                  <h2 className="mb15 text-center">Difference</h2>
                  <div className="m35"></div>
                  <hr />
                  {Object.keys(incomesByYears).length === 0 && (
                    <p className="text-center">No data</p>
                  )}
                  {Object.keys(incomesByYears)
                    .sort(sortStrDesc)
                    .map((key: string) => {
                      const difference = incomesByYears[key].total - outlaysByYears[key].total;
                      const isDifferencePositive = difference >= 0;
                      return (
                        <div className="row-attr row-attr--striped" key={key}>
                          <div className="row-attr__title">{key}: </div>
                          <div className="row-attr__val">
                            <Price
                              className={classNames(
                                "text-bold",
                                isDifferencePositive ? "text-green" : "text-red"
                              )}
                              printPositiveMark
                            >
                              {difference}
                            </Price>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="grid grid--big grid--center mt30">
                <div className="grid__item grid__item--md-span-6 mb20">
                  <h2 className="mb15 text-center">Subjects</h2>
                  <hr />
                  {subjectsIncomesSorted.length === 0 && (
                    <p className="text-center text-income">No data</p>
                  )}
                  {subjectsIncomesSorted.map((subject: SubjectType) => {
                    if (subjectsIncomesTotal[subject._id] === undefined) return null;
                    return (
                      <div
                        className="row-attr row-attr--striped row-attr--income"
                        key={subject._id}
                      >
                        <div className="row-attr__title">{subject.name}: </div>
                        <div className="row-attr__val">
                          <Price className="text-income">
                            {subjectsIncomesTotal[subject._id] || 0}
                          </Price>
                        </div>
                      </div>
                    );
                  })}
                  <hr className="mt20 mb20" />
                  {subjectsOutlaysSorted.length === 0 && (
                    <p className="text-center text-outlay">No data</p>
                  )}
                  {subjectsOutlaysSorted.map((subject: SubjectType) => (
                    <div className="row-attr row-attr--striped row-attr--outlay" key={subject._id}>
                      <div className="row-attr__title">{subject.name}: </div>
                      <div className="row-attr__val">
                        <Price className="text-outlay">
                          {subjectsOutlaysTotal[subject._id] || 0}
                        </Price>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid__item grid__item--md-span-6 mb20">
                  <h2 className="mb15 text-center">Tags</h2>
                  <hr />
                  {tagsIncomesSorted.length === 0 && (
                    <p className="text-center text-income">No data</p>
                  )}
                  {tagsIncomesSorted.map((tag: TagType) => (
                    <div className="row-attr row-attr--striped row-attr--income" key={tag._id}>
                      <div className="row-attr__title">{tag.name}: </div>
                      <div className="row-attr__val">
                        <Price>{tagsIncomesTotal[tag._id] || 0}</Price>
                      </div>
                    </div>
                  ))}
                  <hr className="mt20 mb20" />
                  {tagsOutlaysSorted.length === 0 && (
                    <p className="text-center text-outlay">No data</p>
                  )}
                  {tagsOutlaysSorted.map((tag: TagType) => (
                    <div className="row-attr row-attr--striped row-attr--outlay" key={tag._id}>
                      <div className="row-attr__title">{tag.name}: </div>
                      <div className="row-attr__val">
                        <Price>{tagsOutlaysTotal[tag._id] || 0}</Price>
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
