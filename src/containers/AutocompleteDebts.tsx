import React from "react";
import Autocomplete from "../components/Autocomplete";
import DebtType from "../interfaces/Debt";
import { useQuery } from "@apollo/react-hooks";
import { GET_DEBTS } from "../gql/debt/queries";
import { formatPrice, getDateString } from "../misc";

interface Props {
  error?: string;
  query: string;
  onQueryChange(query: string): void;
  onSelect(id: string): void;
  selectedID?: string;
}

const AutocompleteDebts = ({ error, query, onQueryChange, onSelect, selectedID }: Props) => {
  const handleDebtsLoaded = (res: any) => {
    if (selectedID) {
      const selectedItem = res.debts.find((item: DebtType) => item._id === selectedID);
      if (!selectedItem) return;
      onQueryChange(getDebtStr(selectedItem));
    }
  };

  const debtsQuery = useQuery(GET_DEBTS, {
    onCompleted: handleDebtsLoaded
  });

  const handleChange = (value: string) => {
    onQueryChange(value);
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    const selectedDebt = debts.find((item: DebtType) => item._id === id);
    onQueryChange(getDebtStr(selectedDebt));
  };

  const getDebtStr = (debt: DebtType) =>
    `${debt.subject.name}, ${formatPrice(debt.amount)}, ${getDateString(debt.date)}`;

  const isDebtsAvailable = debtsQuery && debtsQuery.data;
  const debts = isDebtsAvailable
    ? debtsQuery.data.debts.sort((a: DebtType, b: DebtType) => {
        const isPaidCompare = (a.isPaid ? 1 : 0) - (b.isPaid ? 1 : 0);
        if (isPaidCompare !== 0) return isPaidCompare;
        if (!a.isPaid && b.isPaid) return -1;
        const nameCompare = a.subject.name.localeCompare(b.subject.name);
        if (nameCompare !== 0) return nameCompare;
        return b.date - a.date;
      })
    : [];

  return (
    <div className="input-wrapper">
      <Autocomplete
        items={debts.map((debt: DebtType) => ({
          className: debt.isPaid ? "text-gray" : "",
          id: debt._id,
          title: getDebtStr(debt)
        }))}
        onChange={handleChange}
        onSelect={handleSelect}
        query={query}
        label="Debt"
        placeholder="Debt"
      />
      {error && <div className="input-wrapper__error">{error}</div>}
    </div>
  );
};

export default AutocompleteDebts;
