import React from "react";
import classNames from "classnames";
import TagType from "../interfaces/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface Props extends TagType {
  className?: string;
  onClose?(id: string): void;
}

const Tag = ({ _id, className, name, onClose }: Props) => {
  const getTagClassByName = (name: string) => {
    switch (name) {
      case "shopping":
        return "blue";
      case "pub":
        return "orange";
      default:
        return "gray";
    }
  };

  const handleCloseClick = () => {
    onClose && onClose(_id);
  };

  return (
    <span className={classNames("tag mr5", `tag--${getTagClassByName(name)}`, className)}>
      {name}
      {onClose && (
        <button className="tag__btn" onClick={handleCloseClick}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
      )}
    </span>
  );
};

export default Tag;
