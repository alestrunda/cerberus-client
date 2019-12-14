import Debt from "./Debt";
import Payment from "./Payment";

export default interface Income extends Payment {
  debt: Debt;
}
