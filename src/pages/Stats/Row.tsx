import React from "react";
import RowAttribute from "../../components/RowAttribute";
import PercentDifference from "../../components/PercentDifference";
import Price from "../../components/Price";

interface Props {
  current: number;
  previous: number;
  showPercent: boolean;
  title: string;
  to?: string;
}

const Row = ({ current, previous, showPercent, title, to }: Props) => (
  <RowAttribute title={title} to={to}>
    {showPercent && <PercentDifference className="mr10" current={current} previous={previous} />}
    <Price className="text-bold">{current}</Price>
  </RowAttribute>
);

export default Row;
