import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { gql } from "apollo-boost";
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
import Index from "./pages/Index";
import Outlay from "./pages/Outlay";
import OutlayEdit from "./pages/OutlayEdit";
import OutlayNew from "./pages/OutlayNew";
import Outlays from "./pages/Outlays";
import Stats from "./pages/Stats";
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
            <Route path="/" exact component={Index} />
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
            <Route path="/stats/" component={Stats} />
          </Switch>
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
