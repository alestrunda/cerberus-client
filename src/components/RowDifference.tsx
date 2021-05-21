import RowAttribute from "./RowAttribute";
import PercentDifference from "./PercentDifference";
import Price from "./Price";

interface Props {
  current: number;
  previous: number;
  showPercent: boolean;
  title: string;
  to?: string;
}

const RowDifference = ({ current, previous, showPercent, title, to }: Props) => (
  <RowAttribute title={title} to={to}>
    {showPercent && <PercentDifference className="mr10" current={current} previous={previous} />}
    <Price className="text-bold">{current}</Price>
  </RowAttribute>
);

export default RowDifference;
