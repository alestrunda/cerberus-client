import React from "react";
import { useTranslation } from "react-i18next";

export default ({ text }: { text?: string }) => {
  const { t } = useTranslation();
  return <p className="text-center text-gray mt25 mb25">{text || t("No data")}</p>;
};
