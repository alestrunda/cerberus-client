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

  const getTag = (tags: any, id: string) => tags.find((record: any) => record._id === id);

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
  const incomesByYear = data ? getPaymentsByYears(filterPaymentsByTag(data.incomes, tag._id)) : {};
  const outlaysByYear = data ? getPaymentsByYears(filterPaymentsByTag(data.outlays, tag._id)) : {};

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
                      <p className="text-red">Not found</p>
                    ) : (
                      <>
                        <h1 className="mb10">{firstCap(tag.name)}</h1>
                        <div className="grid">
                          <div className="grid__item grid__item--md-span-6">
                            <h2 className="mb10">Incomes</h2>
                            {Object.keys(incomesByYear).map(key => (
                              <RowAttribute title={key}>
                                <Price>{incomesByYear[key].total}</Price>
                              </RowAttribute>
                            ))}
                          </div>
                          <div className="grid__item grid__item--md-span-6">
                            <h2 className="mb10">Outlays</h2>
                            {Object.keys(outlaysByYear).map(key => (
                              <RowAttribute title={key}>
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
