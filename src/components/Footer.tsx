import { useTranslation } from "react-i18next";
import { version } from "../config";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="page-footer">
      <div className="container">
        {t("Cerberus")} v{version}
      </div>
    </footer>
  );
};

export default Footer;
