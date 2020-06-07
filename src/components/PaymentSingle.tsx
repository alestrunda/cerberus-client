import React from "react";
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
  tags: [TagType];
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
  const isDebtAmountDefined = debt && debt.amount !== undefined && debt.amount !== null;

  return (
    <div className="payment-single">
      <p className="payment-single__date">
        <Date timestamp={date} />
      </p>
      <h1 className="payment-single__title">{subject.name}</h1>
      <p className="payment-single__description">{description}</p>
      {hours && (
        <p className="payment-single__hours">
          <span className="text-bold">{hours}</span> hours
        </p>
      )}
      {debt && (
        <p className="payment-single__debt">
          Pro dluh:{" "}
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
          <>
            {" "}
            <div>
              (částečně <Price>{partial}</Price>)
            </div>
          </>
        )}
        <Price className="text-bold text-fs-huge">{amount}</Price>
      </div>
    </div>
  );
};

PaymentSingle.defaultProps = {
  partial: 0
};

export default PaymentSingle;
