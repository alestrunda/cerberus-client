import React from "react";
import classNames from "classnames";

interface Props {
  className?: string;
  children: any;
  title: string;
}

const RowAttribute = ({ className, children, title }: Props) => (
  <div className={classNames("row-attr row-attr--striped", className)}>
    <div className="row-attr__title">{title}: </div>
    <div className="row-attr__val">{children}</div>
  </div>
);

export default RowAttribute;
