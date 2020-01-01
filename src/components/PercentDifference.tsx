import React from "react";
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
  value1: number;
  value2: number;
}

const PercentDifference = ({ className, value1, value2 }: Props) => {
  const difference = value2 !== 0 ? Math.round(-((value1 / value2) * 100 - 100)) : -Infinity;
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
      {percentageType === Type.Up && "+"}
      {difference}%
    </span>
  );
};

export default PercentDifference;
