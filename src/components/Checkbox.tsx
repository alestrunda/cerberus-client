import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Props {
  isChecked?: boolean;
  children: JSX.Element[] | JSX.Element | string;
  onChange(isChecked: boolean): void;
}

const Checkbox = ({ isChecked, children, onChange }: Props) => {
  const handleChange = () => {
    onChange(!isChecked);
  };

  return (
    <label className="input-wrapper input-checkbox">
      <input className="input-checkbox__input" onChange={handleChange} type="checkbox" />
      <div className={classNames("input-checkbox__icon", { active: isChecked })}>
        <FontAwesomeIcon icon={faCheck} />
      </div>
      {children}
    </label>
  );
};

Checkbox.defaultProps = {
  isChecked: false
};

export default Checkbox;
