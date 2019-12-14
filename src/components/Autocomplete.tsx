import React, { useState, CSSProperties } from "react";
import classNames from "classnames";
import AutocompleteItem from "./AutocompleteItem";
import InputField from "./InputField";

interface Props {
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
  const [isItemsOpened, setItemsOpened] = useState(false);

  const handleType = (value: string) => {
    onChange(value);
    setItemsOpened(value ? true : false);
  };

  const onItemSelect = (id: string) => {
    setItemsOpened(false);
    onSelect(id);
  };

  const handleAddNew = () => {
    if (!onAddNew) return;
    onAddNew();
    setItemsOpened(false);
  };

  const handleSelectBtn = () => {
    if (!query) return;
    const selectedItem = items.find(item => item.title.toLowerCase() === query.toLowerCase());
    if (!selectedItem) return;
    setItemsOpened(false);
    onSelect(selectedItem.id);
  };

  const queryNormalized = query.toLowerCase();
  const autocompleteItems =
    query !== ""
      ? items
          .filter(item => item.title.toLowerCase().startsWith(queryNormalized))
          .slice(0, maxItemsCnt)
      : [];
  const canAddNew = onAddNew !== undefined;
  const doesQueryMatchItem =
    items.findIndex(item => item.title.toLowerCase() === queryNormalized) !== -1;
  const showAddNewButton = canAddNew && !doesQueryMatchItem;

  return (
    <div className={classNames("autocomplete", className)} style={style}>
      <InputField
        className="mb0"
        label={label}
        value={query}
        placeholder={placeholder}
        onChange={handleType}
      />
      <ul className={classNames("autocomplete__items", { active: isItemsOpened })}>
        {autocompleteItems.map(item => (
          <AutocompleteItem
            key={item.id}
            className={classNames("autocomplete__item", item.className)}
            onSelect={onItemSelect}
            id={item.id}
            title={item.title}
          />
        ))}
        {showAddNewButton && (
          <li className="autocomplete__item-btn">
            <button
              data-testid="new"
              onClick={handleAddNew}
              className="button button--small button--green"
            >
              Add new
            </button>
          </li>
        )}
        {doesQueryMatchItem && (
          <li className="autocomplete__item-btn">
            <button
              data-testid="select"
              onClick={handleSelectBtn}
              className="button button--small button--green"
            >
              Select
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
