import DebtType from "./Debt";
import IncomeType from "./Income";
import OutlayType from "./Outlay";

type PaymentType = DebtType | IncomeType | OutlayType;

export default PaymentType;
