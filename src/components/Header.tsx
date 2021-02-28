import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="page-header">
      <div className="container">
        <div className="page-head">
          <Link className="page-head__title" to="/">
            <h1>{t("Cerberus")}</h1>
          </Link>
          <nav className="page-head__nav">
            <ul className="nav-main">
              <li className="nav-main__item">
                <Link className="nav-main__link" to="/debts/">
                  {t("Debts")}
                </Link>
              </li>
              <li className="nav-main__item">
                <Link className="nav-main__link" to="/incomes/">
                  {t("Incomes")}
                </Link>
              </li>
              <li className="nav-main__item">
                <Link className="nav-main__link" to="/expenses/">
                  {t("Expenses")}
                </Link>
              </li>
              <li className="nav-main__item">
                <Link className="nav-main__link" to="/stats/">
                  {t("Stats")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
