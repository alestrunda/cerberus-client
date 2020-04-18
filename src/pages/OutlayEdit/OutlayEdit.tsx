import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionLoad from "../../components/SectionLoad";
import FormEditPayment from "../../containers/FormEditPayment";
import { EDIT_OUTLAY } from "../../gql/outlay/mutations";
import { GET_OUTLAY, REMOVE_OUTLAY, GET_OUTLAYS } from "../../gql/outlay/queries";
import PaymentName from "../../interfaces/PaymentName";

interface Props {
  match: any;
}

const OutlayEdit = ({ match }: Props) => {
  const { loading, error, data } = useQuery(GET_OUTLAY, {
    variables: { id: match.params.id }
  });

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container container--small">
          <SectionLoad isError={error !== undefined} isLoading={loading}>
            <div className="box">
              <div className="box__content">
                <h1 className="mb20">Edit outlay</h1>
                {data && (
                  <FormEditPayment
                    editMutation={EDIT_OUTLAY}
                    queriesToUpdateOnDelete={[
                      { itemsName: PaymentName.outlays, name: GET_OUTLAYS }
                    ]}
                    payment={data.outlay}
                    paymentName={PaymentName.outlay}
                    paymentsName={PaymentName.outlays}
                    removeMutation={REMOVE_OUTLAY}
                  />
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

export default OutlayEdit;
