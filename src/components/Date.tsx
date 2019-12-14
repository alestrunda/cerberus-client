import React from "react";
import { getDateString } from "../misc";

interface Props {
  timestamp: number;
}

const Date = ({ timestamp }: Props) => <span className="date">{getDateString(timestamp)}</span>;

export default Date;
