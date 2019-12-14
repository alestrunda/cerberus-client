import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FormNewPayment from "../containers/FormNewPayment";
import { ADD_OUTLAY } from "../gql/outlay/mutations";
import { GET_OUTLAYS } from "../gql/outlay/queries";
import PaymentName from "../interfaces/PaymentName";
import PaymentMutationName from "../interfaces/PaymentMutationName";

import "react-datepicker/dist/react-datepicker.css";

const OutlayNew = () => (
  <>
    <Header />
    <main className="page-content">
      <div className="container container--small">
        <div className="box">
          <div className="box__content">
            <h1 className="page-title">New Outlay</h1>
            <FormNewPayment
              createMutation={ADD_OUTLAY}
              createMutationName={PaymentMutationName.outlay}
              queriesToUpdate={[{ itemsName: PaymentName.outlays, name: GET_OUTLAYS }]}
              paymentName={PaymentName.outlay}
            />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default OutlayNew;
