import React, { useState, CSSProperties } from "react";
import classNames from "classnames";
import AutocompleteItem from "./AutocompleteItem";
import InputField from "./InputField";

interface Props {
  canBeEmpty?: boolean;
  className?: string;
  items: {
    className?: string;
    id: string;
    title: string;
  }[];
  label: string;
  onAddNew?(): void;
  onChange(query: string): void;
  onSelect(id: string): void;
  placeholder: string;
  query?: string;
  maxItemsCnt: number;
  style?: CSSProperties;
}

const Autocomplete = ({
  canBeEmpty,
  className,
  items,
  label,
  maxItemsCnt,
  onAddNew,
  onChange,
  onSelect,
  placeholder,
  query = "",
  style
}: Props) => {
  const [areItemsOpened, setItemsVisible] = useState(false);

  const handleType = (value: string) => {
    onChange(value);
    setItemsVisible(value ? true : false);
  };

  const onItemSelect = (id: string) => {
    setItemsVisible(false);
    onSelect(id);
  };

  const handleCancel = () => {
    setItemsVisible(false);
  };

  const handleAddNew = () => {
    if (!onAddNew) return;
    onAddNew();
    setItemsVisible(false);
  };

  const handleSelectBtn = () => {
    if (!query) return;
    const selectedItem = items.find((item) => item.title.toLowerCase() === query.toLowerCase());
    if (!selectedItem) return;
    setItemsVisible(false);
    onSelect(selectedItem.id);
  };

  const queryNormalized = query.toLowerCase();
  const autocompleteItems =
    query !== ""
      ? items
          .filter((item) => item.title.toLowerCase().startsWith(queryNormalized))
          .slice(0, maxItemsCnt)
      : [];
  const canAddNew = onAddNew !== undefined;
  const doesQueryMatchItem =
    items.findIndex((item) => item.title.toLowerCase() === queryNormalized) !== -1;
  const showAddNewButton = canAddNew && !doesQueryMatchItem;

  return (
    <div className={classNames("autocomplete", className)} style={style}>
      <InputField
        autoComplete="off"
        className="mb0"
        label={label}
        value={query}
        placeholder={placeholder}
        onChange={handleType}
      />
      <ul className={classNames("autocomplete__items", { active: areItemsOpened })}>
        {canBeEmpty && (
          <AutocompleteItem
            className="autocomplete__item autocomplete__item--active autocomplete__item--empty"
            onSelect={onItemSelect}
            id=""
            title="<empty>"
          />
        )}
        {autocompleteItems.map((item) => (
          <AutocompleteItem
            key={item.id}
            className={classNames("autocomplete__item autocomplete__item--active", item.className)}
            onSelect={onItemSelect}
            id={item.id}
            title={item.title}
          />
        ))}
        {showAddNewButton && (
          <li className="autocomplete__item-btn">
            <div className="grid">
              <div className="grid__item grid__item--xs-span-6">
                <button onClick={handleCancel} className="button button--small button--gray">
                  Cancel
                </button>
              </div>
              <div className="grid__item grid__item--xs-span-6 text-right">
                <button
                  data-testid="new"
                  onClick={handleAddNew}
                  className="button button--small button--green"
                >
                  Add new
                </button>
              </div>
            </div>
          </li>
        )}
        {doesQueryMatchItem && (
          <li className="autocomplete__item-btn">
            <div className="grid">
              <div className="grid__item grid__item--xs-span-6">
                <button onClick={handleCancel} className="button button--small button--gray">
                  Cancel
                </button>
              </div>
              <div className="grid__item grid__item--xs-span-6 text-right">
                <button
                  data-testid="select"
                  onClick={handleSelectBtn}
                  className="button button--small button--green"
                >
                  Select
                </button>
              </div>
            </div>
          </li>
        )}
        {!showAddNewButton && !doesQueryMatchItem && (
          <li className="autocomplete__item-btn text-right">
            <button onClick={handleCancel} className="button button--small button--gray">
              Cancel
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

Autocomplete.defaultProps = {
  maxItemsCnt: 5
};

export default Autocomplete;
