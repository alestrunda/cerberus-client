import classNames from "classnames";
import { formatPrice } from "../misc/misc";

interface Props {
  className?: string;
  children?: number;
  printPositiveMark?: boolean;
}

const Price = ({ className, children, printPositiveMark = false }: Props) => {
  if (children === undefined) return null;
  return (
    <span className={classNames("text-price", className)}>
      {printPositiveMark && children >= 0 && "+"}
      {formatPrice(children)}
    </span>
  );
};

export default Price;
