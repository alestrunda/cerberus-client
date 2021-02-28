import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

interface Props {
  active: boolean;
  children: any;
  confirmButtonColor?: string;
  confirmButtonTitle?: string;
  onCancel(): void;
  onConfirm(): void;
}

const PopupConfirm = ({
  active,
  children,
  confirmButtonColor = "green",
  confirmButtonTitle,
  onCancel,
  onConfirm
}: Props) => {
  const { t } = useTranslation();

  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <>
      <div className={classNames("popup-cover", { active })} onClick={handleCancel}></div>
      <div className={classNames("popup-window", { active })}>
        <div className="popup-window__content">
          {children}
          <div className="grid mb10 mt30">
            <div className="grid__item grid__item--xs-span-6">
              <button
                className="button button--gray"
                onClick={handleCancel}
                type="button"
                data-testid="popup-cancel"
              >
                {t("Cancel")}
              </button>
            </div>
            <div className="grid__item grid__item--xs-span-6 text-right">
              <button
                className={classNames("button", `button--${confirmButtonColor}`)}
                onClick={handleConfirm}
                type="button"
                data-testid="popup-confirm"
              >
                {confirmButtonTitle || t("Confirm")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupConfirm;
