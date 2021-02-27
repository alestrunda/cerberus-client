import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import PageBackground from "./components/PageBackground";

import Debt from "./pages/Debt";
import DebtEdit from "./pages/DebtEdit";
import DebtNew from "./pages/DebtNew";
import Debts from "./pages/Debts";
import Expense from "./pages/Expense";
import ExpenseEdit from "./pages/ExpenseEdit";
import ExpenseNew from "./pages/ExpenseNew";
import Expenses from "./pages/Expenses";
import ExpensesYear from "./pages/ExpensesYear";
import Homepage from "./pages/Homepage";
import Income from "./pages/Income";
import IncomeEdit from "./pages/IncomeEdit";
import IncomeNew from "./pages/IncomeNew";
import Incomes from "./pages/Incomes";
import IncomesYear from "./pages/IncomesYear";
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
            source={data && data.backgroundRandom ? `${serverUrl}/${data.backgroundRandom}` : ""}
          />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/debt/new/" component={DebtNew} />
            <Route path="/debt/:id/edit" component={DebtEdit} />
            <Route path="/debt/:id" component={Debt} />
            <Route path="/debts/" component={Debts} />
            <Route path="/expense/new/" component={ExpenseNew} />
            <Route path="/expense/:id/edit" component={ExpenseEdit} />
            <Route path="/expense/:id" component={Expense} />
            <Route path="/expenses/" component={Expenses} />
            <Route path="/income/new/" component={IncomeNew} />
            <Route path="/income/:id/edit" component={IncomeEdit} />
            <Route path="/income/:id" component={Income} />
            <Route path="/incomes/" component={Incomes} />
            <Route path="/stats/expenses/:year" component={ExpensesYear} />
            <Route path="/stats/incomes/:year" component={IncomesYear} />
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
