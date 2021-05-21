import classNames from "classnames";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
  children: any;
  title: string;
  to?: string;
}

const RowAttribute = ({ className, children, title, to }: Props) => {
  const getClassName = () =>
    classNames("row-attr row-attr--striped", { "row-attr--clickable": !!to }, className);

  const renderContent = (): JSX.Element => (
    <>
      <div className="row-attr__title">{title}: </div>
      <div className="row-attr__val">{children}</div>
    </>
  );

  return to ? (
    <Link className={getClassName()} to={to}>
      {renderContent()}
    </Link>
  ) : (
    <div className={getClassName()}>{renderContent()}</div>
  );
};

export default RowAttribute;
