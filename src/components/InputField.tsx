import React from "react";
import classNames from "classnames";
import { slugify } from "../misc";

interface Props {
  className?: string;
  label: string;
  onChange(val: string): void;
  placeholder?: string;
  value: string | number;
  type?: string;
}

const InputField = ({
  className,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
  ...restProps
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={classNames("input-wrapper", className)}>
      <div className="input-label">{label || placeholder}</div>
      <input
        className="input-text"
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
        value={value}
        name={slugify(label)}
        {...restProps}
      />
    </div>
  );
};

export default InputField;
