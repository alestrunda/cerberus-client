import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faMinus } from "@fortawesome/free-solid-svg-icons";
import { PERCENTAGE_MARGIN } from "../constants";

interface Props {
  className?: string;
  value1: number;
  value2: number;
}

const PercentDifference = ({ className, value1, value2 }: Props) => {
  const difference = Math.round(-((value1 / value2) * 100 - 100));
  const percentageType =
    Math.abs(difference) <= PERCENTAGE_MARGIN ? "mid" : difference >= 0 ? "up" : "down";

  return (
    <span className={classNames("percentage", className, `percentage--${percentageType}`)}>
      {percentageType === "down" && (
        <FontAwesomeIcon className="percentage__icon" icon={faArrowDown} />
      )}
      {percentageType === "mid" && <FontAwesomeIcon className="percentage__icon" icon={faMinus} />}
      {percentageType === "up" && <FontAwesomeIcon className="percentage__icon" icon={faArrowUp} />}
      {percentageType === "up" && "+"}
      {difference}%
    </span>
  );
};

export default PercentDifference;
