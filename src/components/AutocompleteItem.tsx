import classNames from "classnames";

interface Props {
  className?: string;
  id: string;
  onSelect(id: string, name: string): void;
  title: string;
}

const AutocompleteItem = ({ className, id, onSelect, title }: Props) => (
  <li className={classNames("item-stripes", className)} onClick={() => onSelect(id, title)}>
    {title}
  </li>
);

AutocompleteItem.defaultProps = {
  className: ""
};

export default AutocompleteItem;
