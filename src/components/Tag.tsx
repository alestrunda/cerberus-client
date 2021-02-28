import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import TagType from "../interfaces/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface Props extends TagType {
  className?: string;
  onClose?(id: string): void;
  to?: string;
}

const Tag = ({ _id, className, name, onClose, to }: Props) => {
  const handleCloseClick = () => {
    onClose && onClose(_id);
  };

  const Element: any = to ? Link : "span";

  return (
    <Element
      className={classNames(
        "tag mr5",
        `tag--${getTagClassByName(name)}`,
        { "tag--clickable": !!to },
        className
      )}
      to={to}
    >
      {name}
      {onClose && (
        <button className="tag__btn" onClick={handleCloseClick}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
      )}
    </Element>
  );
};

const tagColorMapping: Record<string, string> = {
  fitness: "green",
  groceries: "blue",
  pharmacy: "yellow",
  restaurant: "orange",
  "rent and energies": "red",
  transportation: "purple"
};

const getTagClassByName = (name: string) => tagColorMapping[name] || "gray";

export default Tag;
