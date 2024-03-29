import { useTranslation } from "react-i18next";
import Autocomplete from "../components/Autocomplete";
import Price from "../components/Price";
import DebtType from "../interfaces/Debt";
import { useQuery } from "@apollo/client";
import { GET_DEBTS } from "../gql/debt/queries";
import { compareDebts, debtToString } from "../misc/misc";
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
  const { t } = useTranslation();

  const handleDebtsLoaded = (res: any) => {
    if (selected) {
      const selectedItem = res.debts.find((item: DebtType) => item._id === selected._id);
      if (!selectedItem) return;
      onQueryChange(debtToString(selectedItem));
    }
  };

  const debtsQuery = useQuery(GET_DEBTS, {
    onCompleted: handleDebtsLoaded
  });
  const isDebtsAvailable = debtsQuery && debtsQuery.data;
  const debts = isDebtsAvailable ? [...debtsQuery.data.debts].sort(compareDebts) : [];

  const handleChange = (value: string) => {
    onQueryChange(value);
  };

  const handleSelect = (id: string) => {
    const selectedDebt = debts.find((item: DebtType) => item._id === id);
    onSelect(selectedDebt);
    onQueryChange(selectedDebt ? debtToString(selectedDebt) : "");
  };

  return (
    <SectionLoad isError={!!debtsQuery.error} isLoading={debtsQuery.loading} showLoadingIcon>
      <div className="input-wrapper">
        <Autocomplete
          canBeEmpty={canBeEmpty}
          className="autocomplete--debts"
          items={debts.map((debt: DebtType) => ({
            className: debt.isPaid ? "text-gray" : "",
            id: debt._id,
            title: debtToString(debt)
          }))}
          onChange={handleChange}
          onSelect={handleSelect}
          query={query}
          label={t("Debt")}
          placeholder={t("Debt")}
        />
        {selected && (
          <p className="text-fs-tiny text-gray ml5">
            {t("Selected")}: {selected.subject.name} {t("for")} <Price>{selected.amount}</Price>
          </p>
        )}
        {error && <div className="input-wrapper__error">{error}</div>}
      </div>
    </SectionLoad>
  );
};

export default AutocompleteDebts;
