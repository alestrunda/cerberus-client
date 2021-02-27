import React, { useState } from "react";
import { parseFloatSave, slugify } from "../misc/misc";

interface Props {
  label: string;
  onChange(val: number): void;
  placeholder?: string;
  value: number;
  type?: string;
}

const InputNumberAdd = ({
  label,
  onChange,
  placeholder,
  type = "text",
  value,
  ...restProps
}: Props) => {
  const [addValue, setAddValue] = useState(0);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloatSave(e.target.value));
  };

  const handleAddValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddValue(parseFloatSave(e.target.value));
  };

  const handleSubmit = () => {
    setAddValue(0);
    onChange(value + addValue);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <div className="input-wrapper">
      <div className="input-label">{label}</div>
      <div className="input-add">
        <div className="input-add__val">
          <input
            className="input-text"
            data-testid="inputNumber"
            placeholder={placeholder}
            type={type}
            onChange={handleValueChange}
            onFocus={handleFocus}
            name={slugify(label)}
            value={value}
            {...restProps}
          />
        </div>
        <div className="input-add__inner">
          <div className="input-add__text">Add to the value:</div>
          <div className="input-add__val-add">
            <input
              className="input-text"
              data-testid="inputAdd"
              type={type}
              onChange={handleAddValueChange}
              onFocus={handleFocus}
              value={addValue}
              {...restProps}
            />
          </div>
          <button
            className="button button--small button--green input-add__btn"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputNumberAdd;
