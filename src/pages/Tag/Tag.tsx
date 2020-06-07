import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Price from "../../components/Price";
import RowAttribute from "../../components/RowAttribute";
import SectionLoad from "../../components/SectionLoad";
import PaymentType from "../../interfaces/Payment";
import PaymentTotals from "../../interfaces/PaymentTotals";
import TagType from "../../interfaces/Tag";
import { firstCap } from "../../misc";
import NoData from "../../components/NoData";
import NotFound from "../../components/NotFound";

const Tag = ({ match }: any) => {
  const { loading, error, data } = useQuery(gql`
    query {
      incomes {
        _id
        amount
        date
        tags {
          _id
        }
      }
      outlays {
        _id
        amount
        date
        tags {
          _id
        }
      }
      tags {
        _id
        name
      }
    }
  `);

  const getTag = (tags: TagType[], id: string) => tags.find((record: TagType) => record._id === id);

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

  const filterPaymentsByTag = (payments: PaymentType[], tagID: string) =>
    payments.filter(
      (payment: PaymentType) => payment.tags.findIndex((tag: TagType) => tag._id === tagID) !== -1
    );

  const tag = data ? getTag(data.tags, match.params.id) : undefined;
  const incomesByYear = tag ? getPaymentsByYears(filterPaymentsByTag(data.incomes, tag._id)) : {};
  const outlaysByYear = tag ? getPaymentsByYears(filterPaymentsByTag(data.outlays, tag._id)) : {};

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <SectionLoad isError={error !== undefined} isLoading={loading}>
            <>
              {!loading && !error && (
                <div className="box">
                  <div className="box__content">
                    {!tag ? (
                      <NotFound />
                    ) : (
                      <>
                        <h1 className="mb15 text-center">{firstCap(tag.name)}</h1>
                        <div className="grid mb10">
                          <div className="grid__item grid__item--md-span-6">
                            <h2 className="mb10 text-center">Incomes</h2>
                            {!Object.keys(incomesByYear).length && <NoData />}
                            {Object.keys(incomesByYear).map(key => (
                              <RowAttribute key={key} title={key}>
                                <Price>{incomesByYear[key].total}</Price>
                              </RowAttribute>
                            ))}
                          </div>
                          <div className="grid__item grid__item--md-span-6">
                            <h2 className="mb10 text-center">Outlays</h2>
                            {!Object.keys(outlaysByYear).length && <NoData />}
                            {Object.keys(outlaysByYear).map(key => (
                              <RowAttribute key={key} title={key}>
                                <Price>{outlaysByYear[key].total}</Price>
                              </RowAttribute>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          </SectionLoad>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Tag;
