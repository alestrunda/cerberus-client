import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faMinus } from "@fortawesome/free-solid-svg-icons";
import { PERCENTAGE_MARGIN } from "../constants";

enum Type {
  down = "down",
  mid = "mid",
  up = "up"
}

interface Props {
  className?: string;
  value1: number;
  value2: number;
}

const PercentDifference = ({ className, value1, value2 }: Props) => {
  const difference = Math.round(-((value1 / value2) * 100 - 100));
  const percentageType =
    Math.abs(difference) <= PERCENTAGE_MARGIN ? Type.mid : difference >= 0 ? Type.up : Type.down;

  return (
    <span className={classNames("percentage", className, `percentage--${percentageType}`)}>
      {percentageType === Type.down && (
        <FontAwesomeIcon className="percentage__icon" icon={faArrowDown} />
      )}
      {percentageType === Type.mid && (
        <FontAwesomeIcon className="percentage__icon" icon={faMinus} />
      )}
      {percentageType === Type.up && (
        <FontAwesomeIcon className="percentage__icon" icon={faArrowUp} />
      )}
      {percentageType === Type.up && "+"}
      {difference}%
    </span>
  );
};

export default PercentDifference;
