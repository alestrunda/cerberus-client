import React from "react";
import classNames from "classnames";

interface Props {
  className?: string;
  classNameOverlay?: string;
  children: JSX.Element[] | JSX.Element;
  isError: boolean;
  isLoading: boolean;
  styleOverlay?: React.CSSProperties;
}

const SectionLoad = ({
  className,
  classNameOverlay,
  children,
  isError,
  isLoading,
  styleOverlay
}: Props) => (
  <div className={classNames("section-load", className)}>
    <div
      className={classNames(
        "section-load__overlay section-load__overlay--loading",
        {
          active: isLoading
        },
        classNameOverlay
      )}
      style={styleOverlay}
    >
      <p className="text-loading">Loading...</p>
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
      <p className="text-fs-huge">Cannot load data</p>
    </div>
    {children}
  </div>
);

export default SectionLoad;
