import React from "react";
import Autocomplete from "../components/Autocomplete";
import Price from "../components/Price";
import DebtType from "../interfaces/Debt";
import { useQuery } from "@apollo/client";
import { GET_DEBTS } from "../gql/debt/queries";
import { formatPrice, getDateString } from "../misc";
import SectionLoad from "../components/SectionLoad";

interface Props {
  canBeEmpty?: boolean;
  error?: string;
  query: string;
  onQueryChange(query: string): void;
  onSelect(debt: DebtType | undefined): void;
  selected?: DebtType;
}

const AutocompleteDebts = ({
  canBeEmpty,
  error,
  query,
  onQueryChange,
  onSelect,
  selected
}: Props) => {
  const handleDebtsLoaded = (res: any) => {
    if (selected) {
      const selectedItem = res.debts.find((item: DebtType) => item._id === selected._id);
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
    const selectedDebt = debts.find((item: DebtType) => item._id === id);
    onSelect(selectedDebt);
    onQueryChange(selectedDebt ? getDebtStr(selectedDebt) : "");
  };

  const getDebtStr = (debt: DebtType) =>
    `${debt.subject.name}, ${formatPrice(debt.amount)}, ${getDateString(debt.date)}`;

  const isDebtsAvailable = debtsQuery && debtsQuery.data;
  const debts = isDebtsAvailable
    ? [...debtsQuery.data.debts].sort((a: DebtType, b: DebtType) => {
        const isPaidCompare = (a.isPaid ? 1 : 0) - (b.isPaid ? 1 : 0);
        if (isPaidCompare !== 0) return isPaidCompare;
        if (!a.isPaid && b.isPaid) return -1;
        const nameCompare = a.subject.name.localeCompare(b.subject.name);
        if (nameCompare !== 0) return nameCompare;
        return b.date - a.date;
      })
    : [];

  return (
    <SectionLoad isError={!!debtsQuery.error} isLoading={debtsQuery.loading} showLoadingIcon>
      <div className="input-wrapper">
        <Autocomplete
          canBeEmpty={canBeEmpty}
          className="autocomplete--debts"
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
        {selected && (
          <p className="text-fs-tiny text-gray ml5">
            Selected: {selected.subject.name} for <Price>{selected.amount}</Price>
          </p>
        )}
        {error && <div className="input-wrapper__error">{error}</div>}
      </div>
    </SectionLoad>
  );
};

export default AutocompleteDebts;
