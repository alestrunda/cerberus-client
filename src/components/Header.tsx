import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="page-header">
    <div className="container">
      <div className="page-head">
        <Link className="page-head__title" to="/">
          <h1>Cerberus</h1>
        </Link>
        <nav className="page-head__nav">
          <ul className="nav-main">
            <li className="nav-main__item">
              <Link className="nav-main__link" to="/debts/">
                Debts
              </Link>
            </li>
            <li className="nav-main__item">
              <Link className="nav-main__link" to="/incomes/">
                Incomes
              </Link>
            </li>
            <li className="nav-main__item">
              <Link className="nav-main__link" to="/expenses/">
                Expenses
              </Link>
            </li>
            <li className="nav-main__item">
              <Link className="nav-main__link" to="/stats/">
                Stats
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
