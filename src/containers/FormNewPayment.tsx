import React, { useState, FormEvent } from "react";
import DatePicker from "react-datepicker";
import classNames from "classnames";
import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useTranslation } from "react-i18next";
import AutocompleteDebts from "../containers/AutocompleteDebts";
import AutocompleteSubjects from "../containers/AutocompleteSubjects";
import AutocompleteTags from "../containers/AutocompleteTags";
import Checkbox from "../components/Checkbox";
import InputNumberAdd from "../components/InputNumberAdd";
import Price from "../components/Price";
import SectionLoad from "../components/SectionLoad";
import DebtType from "../interfaces/Debt";
import Errors from "../interfaces/Errors";
import SubjectType from "../interfaces/Subject";
import TagType from "../interfaces/Tag";
import PaymentName from "../interfaces/PaymentName";
import PaymentMutationName from "../interfaces/PaymentMutationName";
import { dateFormat } from "../config";

interface queryToUpdate {
  itemsName: PaymentName;
  name: DocumentNode;
}

interface Props {
  createMutation: DocumentNode;
  createMutationName: PaymentMutationName;
  queriesToUpdate?: queryToUpdate[];
  paymentName: PaymentName;
}

const FormNewPayment = ({
  createMutation,
  createMutationName,
  queriesToUpdate,
  paymentName
}: Props) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Errors | undefined>(undefined);
  const [amount, setAmount] = useState(0);
  const [partial, setPartial] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [date, setDate] = useState(new Date());
  const [debt, setDebt] = useState<DebtType | undefined>(undefined);
  const [debtQuery, setDebtQuery] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(0);
  const [subjectQuery, setSubjectQuery] = useState("");
  const [subject, setSubject] = useState<SubjectType | undefined>(undefined);
  const [tags, setTags] = useState<TagType[]>([]);
  const [addPayment, dataMutation] = useMutation(createMutation, {
    update: (store, { data }) => {
      if (!queriesToUpdate) return;
      for (let query of queriesToUpdate) {
        try {
          //update cache
          const queryCache: any = store.readQuery({ query: query.name });
          const newCache: any = {};
          newCache[query.itemsName] = [
            {
              ...data[createMutationName],
              ...getPayment()
            },
            ...queryCache[query.itemsName]
          ];
          store.writeQuery({
            query: query.name,
            data: newCache
          });
        } catch (e) {
          //the cache is probably just empty, no action necessary
          return;
        }
      }
    }
  });

  const getPayment = () => ({
    amount,
    date: date.getTime(),
    debtID: debt ? debt._id : null,
    description,
    hours,
    isPaid: isPaid,
    partial,
    subjectID: subject?._id,
    tags: tags.map((tag) => tag._id)
  });

  const validateForm = () => {
    const errors: Errors = {};
    if (!subject) errors.subject = t("Subject cannot be empty");
    return Object.keys(errors).length > 0 ? errors : undefined;
  };

  const handleSubmit = (e: FormEvent) => {
    if (e) e.preventDefault();
    const errors = validateForm();
    if (errors) {
      setErrors(errors);
      return;
    }
    resetFormValues();
    addPayment({
      variables: getPayment()
    });
  };

  const resetFormValues = () => {
    setErrors(undefined);
    setAmount(0);
    setPartial(0);
    setDebt(undefined);
    setDebtQuery("");
    setHours(0);
    setIsPaid(false);
    setDescription("");
    setDate(new Date());
    setTags([]);
    setSubject(undefined);
    setSubjectQuery("");
  };

  const handleDateChange = (date: any) => {
    setDate(date);
  };

  const handleDescriptionType = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleAmountType = (value: number) => {
    setAmount(value);
  };

  const handlePartialType = (value: number) => {
    setPartial(value);
  };

  const removeError = (key: string) => {
    const newErrors: Errors = { ...errors };
    delete newErrors[key];
    return newErrors;
  };

  const handleSubjectSelect = (subject: SubjectType) => {
    setErrors(removeError("subject"));
    setSubject(subject);
  };

  const handleTagSelect = (tag: TagType) => {
    setTags([...tags, tag]);
  };

  const handleTagRemove = (tagID: string) => {
    setTags(tags.filter((tag) => tag._id !== tagID));
  };

  const handleIsPaidToggle = (isChecked: boolean) => {
    setIsPaid(isChecked);
  };

  const handleSubjectQueryChange = (query: string) => {
    setSubjectQuery(query);
  };

  const handleDebtQueryChange = (query: string) => {
    setDebtQuery(query);
  };

  const handleDebtSelect = (debt: DebtType | undefined) => {
    setDebt(debt);
  };

  const handleHoursType = (value: number) => {
    setHours(value);
  };

  return (
    <SectionLoad isError={!!dataMutation.error} isLoading={dataMutation.loading}>
      <>
        <AutocompleteSubjects
          error={errors?.subject}
          query={subjectQuery}
          onQueryChange={handleSubjectQueryChange}
          onSelect={handleSubjectSelect}
          selected={subject}
        />
        <InputNumberAdd
          label={t("Amount")}
          type="number"
          value={amount}
          onChange={handleAmountType}
        />
        {paymentName === PaymentName.debt && (
          <>
            <InputNumberAdd
              label={t("Hours")}
              type="number"
              value={hours}
              onChange={handleHoursType}
            />
            <InputNumberAdd
              label={t("Partial")}
              type="number"
              value={partial}
              onChange={handlePartialType}
            />
            <Checkbox isChecked={isPaid} onChange={handleIsPaidToggle}>
              {t("Paid?")}
            </Checkbox>
          </>
        )}
        {paymentName === PaymentName.income && (
          <AutocompleteDebts
            canBeEmpty
            query={debtQuery}
            onQueryChange={handleDebtQueryChange}
            onSelect={handleDebtSelect}
            selected={debt}
          />
        )}
        <div className="input-wrapper">
          <div className="input-label">{t("Date")}</div>
          <DatePicker
            className="input-text"
            selected={date}
            onChange={handleDateChange}
            dateFormat={dateFormat}
            name="date"
          />
        </div>
        <div className="input-wrapper">
          <div className="input-label">{t("Description")}</div>
          <textarea
            className="input-text input-textarea"
            placeholder={t("Description")}
            onChange={handleDescriptionType}
            value={description}
            name="description"
          ></textarea>
        </div>
        <AutocompleteTags activeTags={tags} onSelect={handleTagSelect} onRemove={handleTagRemove} />
        {dataMutation.error && <p className="text-red">{dataMutation.error.message}</p>}
        {dataMutation.data && (
          <p className="text-green">
            {t("Added")} {dataMutation.data[createMutationName].subject.name} {t("for")}{" "}
            <Price>{dataMutation.data[createMutationName].amount}</Price>
          </p>
        )}
        <div className="text-right mb5">
          <button
            className={classNames("button button--green", {
              disabled: dataMutation.loading
            })}
            disabled={dataMutation.loading}
            onClick={handleSubmit}
            data-testid="submit"
          >
            {t("Create")}
          </button>
        </div>
      </>
    </SectionLoad>
  );
};

export default FormNewPayment;
