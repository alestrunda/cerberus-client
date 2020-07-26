import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import PageBackground from "./components/PageBackground";

import Debt from "./pages/Debt";
import DebtEdit from "./pages/DebtEdit";
import DebtNew from "./pages/DebtNew";
import Debts from "./pages/Debts";
import Income from "./pages/Income";
import IncomeEdit from "./pages/IncomeEdit";
import IncomeNew from "./pages/IncomeNew";
import Incomes from "./pages/Incomes";
import IncomesYear from "./pages/IncomesYear";
import Homepage from "./pages/Homepage";
import Outlay from "./pages/Outlay";
import OutlayEdit from "./pages/OutlayEdit";
import OutlayNew from "./pages/OutlayNew";
import Outlays from "./pages/Outlays";
import OutlaysYear from "./pages/OutlaysYear";
import Stats from "./pages/Stats";
import Subject from "./pages/Subject";
import Tag from "./pages/Tag";
import { serverUrl } from "./config";

function App() {
  const { data } = useQuery(gql`
    query {
      backgroundRandom
    }
  `);

  return (
    <React.StrictMode>
      <Router>
        <div className="page-all">
          <PageBackground
            image={data && data.backgroundRandom ? `${serverUrl}/${data.backgroundRandom}` : ""}
          />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/debt/new/" component={DebtNew} />
            <Route path="/debt/:id/edit" component={DebtEdit} />
            <Route path="/debt/:id" component={Debt} />
            <Route path="/debts/" component={Debts} />
            <Route path="/income/new/" component={IncomeNew} />
            <Route path="/income/:id/edit" component={IncomeEdit} />
            <Route path="/income/:id" component={Income} />
            <Route path="/incomes/" component={Incomes} />
            <Route path="/outlay/new/" component={OutlayNew} />
            <Route path="/outlay/:id/edit" component={OutlayEdit} />
            <Route path="/outlay/:id" component={Outlay} />
            <Route path="/outlays/" component={Outlays} />
            <Route path="/stats/incomes/:year" component={IncomesYear} />
            <Route path="/stats/outlays/:year" component={OutlaysYear} />
            <Route path="/stats/" component={Stats} />
            <Route path="/subject/:id" component={Subject} />
            <Route path="/tag/:id" component={Tag} />
          </Switch>
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
