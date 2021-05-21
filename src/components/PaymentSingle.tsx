import { Trans, useTranslation } from "react-i18next";
import Price from "../components/Price";
import DebtType from "../interfaces/Debt";
import SubjectType from "../interfaces/Subject";
import TagType from "../interfaces/Tag";
import Date from "./Date";
import Tag from "./Tag";
import { Link } from "react-router-dom";

interface Props {
  amount: number;
  date: number;
  debt?: DebtType;
  description: string;
  hours?: number;
  partial?: number;
  subject: SubjectType;
  tags: TagType[];
}

const PaymentSingle = ({
  amount,
  date,
  debt,
  description,
  hours,
  partial,
  subject,
  tags
}: Props) => {
  const { t } = useTranslation();
  const isDebtAmountDefined = debt && debt.amount !== undefined && debt.amount !== null;

  return (
    <div className="payment-single">
      <p className="payment-single__date">
        <Date timestamp={date} />
      </p>
      <h1 className="payment-single__title">
        <Link className="link-hover-underline" to={`/subject/${subject._id}`}>
          {subject.name}
        </Link>
      </h1>
      <p className="payment-single__description">{description}</p>
      {hours !== 0 && (
        <p className="payment-single__hours">
          <Trans
            i18nKey="<0></0> hours"
            values={{ hours }}
            components={[<span className="text-bold">{hours}</span>]}
          />
        </p>
      )}
      {debt && (
        <p className="payment-single__debt">
          {t("Debt")}:{" "}
          <Link className="link-underline text-debt text-bold" to={`/debt/${debt._id}`}>
            {debt.subject.name}
          </Link>
          {isDebtAmountDefined && (
            <>
              , <Price className="text-bold">{debt.amount}</Price>
            </>
          )}
        </p>
      )}
      <div className="payment-single__tags">
        {tags.map((item: TagType) => (
          <Tag key={item._id} {...item} to={`/tag/${item._id}`} />
        ))}
      </div>
      <div className="m10"></div>
      <div className="payment-single__price">
        {partial !== 0 && (
          <div>
            <Trans
              i18nKey="(partial <0></0>)"
              values={{ partial }}
              components={[<Price>{partial}</Price>]}
            />
          </div>
        )}
        <Price className="text-bold text-fs-huge">{amount}</Price>
      </div>
    </div>
  );
};

PaymentSingle.defaultProps = {
  hours: 0,
  partial: 0
};

export default PaymentSingle;
