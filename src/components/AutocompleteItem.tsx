import classNames from "classnames";

interface Props {
  className?: string;
  id: string;
  onSelect(id: string, name: string): void;
  query?: string;
  title: string;
}

const AutocompleteItem = ({ className, id, onSelect, query = "", title }: Props) => {
  const renderHighlightedText = (text: string, searchQuery: string) => {
    if (!searchQuery) return text;

    // Create a case-insensitive regex to find the query
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) => {
      // Check if this part matches the query (case-insensitive)
      if (part.toLowerCase() === searchQuery.toLowerCase()) {
        return (
          <mark key={index} className="autocomplete__highlight">
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <li className={classNames("item-stripes", className)} onClick={() => onSelect(id, title)}>
      {renderHighlightedText(title, query)}
    </li>
  );
};

AutocompleteItem.defaultProps = {
  className: ""
};

export default AutocompleteItem;
