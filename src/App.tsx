import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

const App = () => {
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
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/debt/new/" element={<DebtNew />} />
            <Route path="/debt/:id/edit" element={<DebtEdit />} />
            <Route path="/debt/:id" element={<Debt />} />
            <Route path="/debts/" element={<Debts />} />
            <Route path="/expense/new/" element={<ExpenseNew />} />
            <Route path="/expense/:id/edit" element={<ExpenseEdit />} />
            <Route path="/expense/:id" element={<Expense />} />
            <Route path="/expenses/" element={<Expenses />} />
            <Route path="/income/new/" element={<IncomeNew />} />
            <Route path="/income/:id/edit" element={<IncomeEdit />} />
            <Route path="/income/:id" element={<Income />} />
            <Route path="/incomes/" element={<Incomes />} />
            <Route path="/stats/expenses/:year" element={<ExpensesYear />} />
            <Route path="/stats/incomes/:year" element={<IncomesYear />} />
            <Route path="/stats/" element={<Stats />} />
            <Route path="/subject/:id" element={<Subject />} />
            <Route path="/tag/:id" element={<Tag />} />
          </Routes>
        </div>
      </Router>
    </React.StrictMode>
  );
};

export default App;
