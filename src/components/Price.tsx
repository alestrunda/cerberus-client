import React from "react";
import classNames from "classnames";
import { formatPrice } from "../misc";

interface Props {
  className?: string;
  children?: number;
}

const Price = ({ className, children }: Props) => {
  if (children === undefined) return null;
  return <span className={classNames("text-price", className)}>{formatPrice(children)}</span>;
};

export default Price;
