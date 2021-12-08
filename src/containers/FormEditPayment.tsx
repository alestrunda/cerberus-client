import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Navigate } from "react-router-dom";
import classNames from "classnames";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import AutocompleteDebts from "../containers/AutocompleteDebts";
import AutocompleteSubjects from "../containers/AutocompleteSubjects";
import AutocompleteTags from "../containers/AutocompleteTags";
import Checkbox from "../components/Checkbox";
import InputNumberAdd from "../components/InputNumberAdd";
import SectionLoad from "../components/SectionLoad";
import PopupConfirm from "../components/PopupConfirm";
import DebtType from "../interfaces/Debt";
import Errors from "../interfaces/Errors";
import ExpenseType from "../interfaces/Expense";
import IncomeType from "../interfaces/Income";
import SubjectType from "../interfaces/Subject";
import TagType from "../interfaces/Tag";
import { dateFormat } from "../config";
import { DocumentNode } from "graphql";
import PaymentName from "../interfaces/PaymentName";

interface queryToUpdate {
  itemsName: PaymentName;
  name: DocumentNode;
}

interface Props {
  editMutation: DocumentNode;
  queryToRefetchOnEdit?: DocumentNode;
  queriesToUpdateOnDelete?: queryToUpdate[];
  payment: DebtType | IncomeType | ExpenseType;
  paymentName: PaymentName;
  paymentsName: PaymentName;
  removeMutation: DocumentNode;
}

const FormEditPayment = ({
  payment,
  editMutation,
  queryToRefetchOnEdit,
  queriesToUpdateOnDelete,
  paymentName,
  paymentsName,
  removeMutation
}: Props) => {
  const { t } = useTranslation();
  const [isPopupRemoveOpen, setPopupRemoveOpen] = useState(false);
  const [errors, setErrors] = useState<Errors | undefined>(undefined);
  const [amount, setAmount] = useState(payment.amount);
  const [date, setDate] = useState(new Date(payment.date));
  const [debt, setDebt] = useState("debt" in payment ? payment.debt : undefined);
  const [debtQuery, setDebtQuery] = useState("");
  const [description, setDescription] = useState(payment.description);
  const [hours, setHours] = useState("hours" in payment ? payment.hours : 0);
  const [isPaid, setIsPaid] = useState("isPaid" in payment ? payment.isPaid : false);
  const [partial, setPartial] = useState("partial" in payment ? payment.partial : 0);
  const [subjectQuery, setSubjectQuery] = useState("");
  const [subject, setSubject] = useState<SubjectType>(payment.subject);
  const [tags, setTags] = useState<TagType[]>(payment.tags);
  const [editPayment, dataEditMutation] = useMutation(editMutation, {
    refetchQueries: () => {
      if (!queryToRefetchOnEdit) return [];
      return [
        {
          query: queryToRefetchOnEdit,
          variables: { id: payment._id }
        }
      ];
    }
  });
  const [removePayment, dataRemoveMutation] = useMutation(removeMutation, {
    update: (store) => {
      if (!queriesToUpdateOnDelete) return;
      for (let query of queriesToUpdateOnDelete) {
        try {
          //update cache
          const queryCache: any = store.readQuery({ query: query.name });
          const newCache: any = {};
          const indexToRemove = queryCache[query.itemsName].findIndex(
            (item: any) => item._id === payment._id
          );
          newCache[query.itemsName] = [...queryCache[query.itemsName]];
          newCache[query.itemsName].splice(indexToRemove, 1);
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

  const handleSubjectSelect = (subject: SubjectType) => {
    setSubject(subject);
  };

  const handleAmountType = (value: number) => {
    setAmount(value);
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handlePartialType = (value: number) => {
    setPartial(value);
  };

  const handleHoursType = (value: number) => {
    setHours(value);
  };

  const getPayment = () => ({
    _id: payment._id,
    amount,
    date: date.getTime(),
    debtID: debt ? debt._id : null,
    description,
    hours,
    isPaid,
    partial,
    subjectID: subject._id,
    tags: tags.map((tag) => tag._id)
  });

  const validateForm = () => {
    const errors: Errors = {};
    if (!subject?._id) errors.subject = t("Subject cannot be empty");
    return Object.keys(errors).length > 0 ? errors : undefined;
  };

  const handleEdit = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    const errors = validateForm();
    if (errors) {
      setErrors(errors);
      return;
    }
    editPayment({
      variables: getPayment()
    });
  };

  const handleRemove = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setPopupRemoveOpen(true);
  };

  const handleRemoveCancel = () => {
    setPopupRemoveOpen(false);
  };

  const handleRemoveConfirm = () => {
    setPopupRemoveOpen(false);
    removePayment({
      variables: {
        _id: payment._id
      }
    });
  };

  const handleDescriptionType = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
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

  const handleDebtQueryChange = (query: string) => {
    setDebtQuery(query);
  };

  const handleDebtSelect = (debt: DebtType | undefined) => {
    setDebt(debt);
  };

  const handleSubjectQueryChange = (query: string) => {
    setSubjectQuery(query);
  };

  const getErrorMessage = () => {
    if (dataEditMutation.error) return dataEditMutation.error.message;
    if (dataRemoveMutation.error) return dataRemoveMutation.error.message;
  };

  if (dataEditMutation.data) return <Navigate to={`/${paymentName}/${payment._id}`} />;
  if (dataRemoveMutation.data) return <Navigate to={`/${paymentsName}/`} />;

  const isMutationLoading = dataEditMutation.loading || dataRemoveMutation.loading;
  const errorMessage = getErrorMessage();

  return (
    <>
      <SectionLoad
        isError={!!dataEditMutation.error || !!dataRemoveMutation.error}
        isLoading={dataEditMutation.loading || dataRemoveMutation.loading}
      >
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
          )}{" "}
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
              name="description"
              onChange={handleDescriptionType}
              value={description}
            ></textarea>
          </div>
          <AutocompleteTags
            activeTags={tags}
            onRemove={handleTagRemove}
            onSelect={handleTagSelect}
          />
          {errorMessage && <p className="text-red mb15">{errorMessage}</p>}
          <div className="grid mb5">
            <div className="grid__item grid__item--xs-span-6">
              <button
                className={classNames("button button--red", {
                  disabled: isMutationLoading
                })}
                disabled={isMutationLoading}
                onClick={handleRemove}
                data-testid="remove"
              >
                {t("Remove")}
              </button>
            </div>
            <div className="grid__item grid__item--xs-span-6 text-right">
              <button
                className={classNames("button button--green", {
                  disabled: isMutationLoading
                })}
                disabled={isMutationLoading}
                onClick={handleEdit}
                data-testid="edit"
              >
                {t("Edit")}
              </button>
            </div>
          </div>
        </>
      </SectionLoad>
      <PopupConfirm
        active={isPopupRemoveOpen}
        confirmButtonColor="red"
        confirmButtonTitle={t("Remove")}
        onCancel={handleRemoveCancel}
        onConfirm={handleRemoveConfirm}
      >
        <p>{t("Please confirm removing this item:")}</p>
      </PopupConfirm>
    </>
  );
};

export default FormEditPayment;
