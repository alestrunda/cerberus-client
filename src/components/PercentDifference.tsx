import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faMinus } from "@fortawesome/free-solid-svg-icons";
import { PERCENTAGE_MARGIN } from "../constants";

enum Type {
  Down = "down",
  Mid = "mid",
  Up = "up"
}

interface Props {
  className?: string;
  current: number;
  previous: number;
}

const PercentDifference = ({ className, current, previous }: Props) => {
  const difference =
    previous !== 0 ? Math.round(((current - previous) / previous) * 100) : -Infinity;
  const percentageType =
    Math.abs(difference) <= PERCENTAGE_MARGIN ? Type.Mid : difference >= 0 ? Type.Up : Type.Down;

  return (
    <span className={classNames("percentage", className, `percentage--${percentageType}`)}>
      {percentageType === Type.Down && (
        <FontAwesomeIcon className="percentage__icon" icon={faArrowDown} />
      )}
      {percentageType === Type.Mid && (
        <FontAwesomeIcon className="percentage__icon" icon={faMinus} />
      )}
      {percentageType === Type.Up && (
        <FontAwesomeIcon className="percentage__icon" icon={faArrowUp} />
      )}
      {difference > 0 && "+"}
      {difference}%
    </span>
  );
};

export default PercentDifference;
