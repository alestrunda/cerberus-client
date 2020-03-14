import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import classNames from "classnames";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import PaymentType from "../../interfaces/Payment";
import SubjectType from "../../interfaces/Subject";
import TagType from "../../interfaces/Tag";
import Price from "../../components/Price";
import { sortStringDesc, compareByKey, recountForWholeYear } from "../../misc";
import RowAttribute from "../../components/RowAttribute";
import PaymentTotals from "../../interfaces/PaymentTotals";
import Payments from "./Payments";

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
          name
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
  `);

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

  const getPaymentsByYears = (payments: PaymentType[]) => {
    return payments.reduce((total: PaymentTotals, item: PaymentType) => {
      const year = new Date(item.date).getFullYear();
      if (total[year]) {
        total[year].items.push(item);
        total[year].total += item.amount;
      } else {
        total[year] = { items: [item], total: item.amount };
      }
      return total;
    }, {});
  };

  const sortByTotal = (items: SubjectType[] | TagType[], totals: Totals) => {
    const sorted = [...items];
    sorted.sort((a: SubjectType | TagType, b: SubjectType | TagType) => {
      const aTotal = totals[a._id] || 0;
      const bTotal = totals[b._id] || 0;
      if (aTotal === bTotal) return compareByKey(a, b, "name");
      return bTotal - aTotal;
    });
    return sorted;
  };

  const incomesByYears = data ? getPaymentsByYears(data.incomes) : {};
  const outlaysByYears = data ? getPaymentsByYears(data.outlays) : {};

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

  const yearsWithPayment = Object.keys({ ...incomesByYears, ...outlaysByYears });

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
                  <Payments
                    payments={data ? data.incomes : []}
                    paymentsByYears={incomesByYears}
                    title="Incomes"
                  />
                </div>
                <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 mb20">
                  <Payments
                    payments={data ? data.outlays : []}
                    paymentsByYears={outlaysByYears}
                    title="Outlays"
                  />
                </div>
                <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6 mb20">
                  <h2 className="mb15 text-center">Difference</h2>
                  <div className="m35"></div>
                  <hr />
                  {yearsWithPayment.length === 0 && <p className="text-center">No data</p>}
                  {yearsWithPayment.sort(sortStringDesc).map((key: string) => {
                    const incomesTotal = incomesByYears[key]?.total || 0;
                    const outcomesTotal = outlaysByYears[key]?.total || 0;
                    const difference = incomesTotal - outcomesTotal;
                    const isDifferencePositive = difference >= 0;
                    const isCurrentYear = key === new Date().getFullYear().toString();
                    return (
                      <>
                        <RowAttribute key={key} title={isCurrentYear ? `${key} (current)` : key}>
                          <Price
                            className={classNames(
                              "text-bold",
                              isDifferencePositive ? "text-green" : "text-red"
                            )}
                            printPositiveMark
                          >
                            {difference}
                          </Price>
                        </RowAttribute>
                        {isCurrentYear && (
                          <RowAttribute key={`${key}-expected`} title={`${key} (expected)`}>
                            <Price
                              className={classNames(
                                "text-bold",
                                isDifferencePositive ? "text-green" : "text-red"
                              )}
                              printPositiveMark
                            >
                              {recountForWholeYear(difference)}
                            </Price>
                          </RowAttribute>
                        )}
                      </>
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
                      <RowAttribute
                        className="row-attr--income"
                        key={subject._id}
                        title={subject.name}
                      >
                        <Price className="text-income">
                          {subjectsIncomesTotal[subject._id] || 0}
                        </Price>
                      </RowAttribute>
                    );
                  })}
                  <hr className="mt20 mb20" />
                  {subjectsOutlaysSorted.length === 0 && (
                    <p className="text-center text-outlay">No data</p>
                  )}
                  {subjectsOutlaysSorted.map((subject: SubjectType) => (
                    <RowAttribute
                      className="row-attr--outlay"
                      key={subject._id}
                      title={subject.name}
                    >
                      <Price className="text-outlay">
                        {subjectsOutlaysTotal[subject._id] || 0}
                      </Price>
                    </RowAttribute>
                  ))}
                </div>
                <div className="grid__item grid__item--md-span-6 mb20">
                  <h2 className="mb15 text-center">Tags</h2>
                  <hr />
                  {tagsIncomesSorted.length === 0 && (
                    <p className="text-center text-income">No data</p>
                  )}
                  {tagsIncomesSorted.map((tag: TagType) => (
                    <RowAttribute className="row-attr--income" key={tag._id} title={tag.name}>
                      <Price>{tagsIncomesTotal[tag._id] || 0}</Price>
                    </RowAttribute>
                  ))}
                  <hr className="mt20 mb20" />
                  {tagsOutlaysSorted.length === 0 && (
                    <p className="text-center text-outlay">No data</p>
                  )}
                  {tagsOutlaysSorted.map((tag: TagType) => (
                    <RowAttribute className="row-attr--outlay" key={tag._id} title={tag.name}>
                      <Price>{tagsOutlaysTotal[tag._id] || 0}</Price>
                    </RowAttribute>
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
