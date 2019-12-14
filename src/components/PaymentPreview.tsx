import React from "react";
import classNames from "classnames";
import Date from "../components/Date";
import Price from "../components/Price";
import TagType from "../interfaces/Tag";
import PaymentName from "../interfaces/PaymentName";
import { Link } from "react-router-dom";
import Tag from "./Tag";

interface Props {
  _id: string;
  amount: number;
  className?: string;
  date: number;
  description?: string;
  isPaid?: boolean;
  subject: {
    name: string;
  };
  tags: [TagType];
  type: PaymentName;
}

const PaymentPreview = ({
  _id,
  amount,
  className,
  date,
  description,
  isPaid,
  subject,
  tags,
  type
}: Props) => (
  <Link
    to={`/${type}/${_id}`}
    className={classNames("payment item-stripes", `payment--${type}`, className, {
      unactive: isPaid
    })}
  >
    <div className="payment__date">
      <Date timestamp={date} />
    </div>
    <div className="payment__content">
      <div className="payment__title">
        <h2 className="heading-small">{subject.name}</h2>
      </div>
      <div className="text-gray">{description}</div>
      <div>
        {tags.map(item => (
          <Tag key={item._id} {...item} />
        ))}
      </div>
    </div>
    <div className="payment__amount">
      <Price>{amount}</Price>
    </div>
  </Link>
);

export default PaymentPreview;
