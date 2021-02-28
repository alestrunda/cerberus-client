import { getDateString } from "../misc/misc";

interface Props {
  timestamp: number;
}

const Date = ({ timestamp }: Props) => <span className="date">{getDateString(timestamp)}</span>;

export default Date;
