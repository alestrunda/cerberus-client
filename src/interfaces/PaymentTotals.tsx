import DebtType from "./Debt";
import IncomeType from "./Income";
import OutlayType from "./Outlay";

export default interface PaymentTotals {
  [key: string]: {
    items: [DebtType | IncomeType | OutlayType];
    total: number;
  };
}
