import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
  children: any;
  title: string;
  to?: string;
}

const RowAttribute = ({ className, children, title, to }: Props) => {
  const getClassName = () =>
    classNames("row-attr row-attr--striped", { "row-attr--clickable": !!to }, className);
  const content: JSX.Element = (
    <>
      <div className="row-attr__title">{title}: </div>
      <div className="row-attr__val">{children}</div>
    </>
  );

  return to ? (
    <Link className={getClassName()} to={to}>
      {content}
    </Link>
  ) : (
    <div className={getClassName()}>{content}</div>
  );
};

export default RowAttribute;
