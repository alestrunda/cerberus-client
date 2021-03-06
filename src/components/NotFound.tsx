import { useTranslation } from "react-i18next";

const NotFound = ({ text }: { text?: string }) => {
  const { t } = useTranslation();
  return <p className="text-error text-center text-uppercase mb10">{text || t("Not found")}</p>;
};

export default NotFound;
