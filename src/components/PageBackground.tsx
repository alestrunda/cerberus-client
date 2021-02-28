import classNames from "classnames";

interface Props {
  source: string;
}

const PageBackground = ({ source }: Props) => (
  <div
    className={classNames("page-bg", {
      active: !!source
    })}
  >
    <img className="page-bg__img" src={source} alt="page-background" />
  </div>
);

export default PageBackground;
