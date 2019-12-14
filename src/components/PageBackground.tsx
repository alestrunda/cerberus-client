import React from "react";
import classNames from "classnames";

interface Props {
  image: string;
}

const PageBackground = ({ image }: Props) => (
  <div
    className={classNames("page-bg", {
      active: !!image
    })}
  >
    <img className="page-bg__img" src={image} alt="" />
  </div>
);

export default PageBackground;
