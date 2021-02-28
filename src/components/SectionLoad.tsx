import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { MIN_LOADER_DELAY } from "../constants";

interface Props {
  className?: string;
  classNameOverlay?: string;
  children: JSX.Element[] | JSX.Element;
  isError: boolean;
  isLoading: boolean;
  loadingText?: string;
  showLoadingIcon?: boolean;
  styleOverlay?: React.CSSProperties;
}

const SectionLoad = ({
  className,
  classNameOverlay,
  children,
  isError,
  isLoading,
  loadingText,
  showLoadingIcon = false,
  styleOverlay
}: Props) => {
  const { t } = useTranslation();
  const [isTimerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (isLoading === true) {
      setTimer();
    }
  }, [isLoading]);

  const setTimer = () => {
    setTimerRunning(true);
    setTimeout(() => {
      setTimerRunning(false);
    }, MIN_LOADER_DELAY);
  };

  return (
    <div className={classNames("section-load", className)}>
      <div
        className={classNames(
          "section-load__overlay section-load__overlay--loading",
          {
            active: isLoading || isTimerRunning
          },
          classNameOverlay
        )}
        style={styleOverlay}
      >
        {showLoadingIcon && <FontAwesomeIcon className="section-load__icon" icon={faSpinner} />}
        {!showLoadingIcon && <p className="text-loading">{t("Loading")}...</p>}
        {loadingText && <p className="mt15">{loadingText}</p>}
      </div>
      <div
        className={classNames(
          "section-load__overlay section-load__overlay--error",
          {
            active: isError
          },
          classNameOverlay
        )}
        style={styleOverlay}
      >
        <p className="text-fs-huge">{t("Cannot load data")}</p>
      </div>
      {children}
    </div>
  );
};

export default SectionLoad;
