import React, { useState } from "react";
import Autocomplete from "../components/Autocomplete";
import SubjectType from "../interfaces/Subject";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_SUBJECT } from "../gql/subject/mutations";
import { GET_SUBJECTS } from "../gql/subject/queries";

interface Props {
  query: string;
  onQueryChange(query: string): void;
  onSelect(id: string): void;
  selectedID?: string;
}

interface SubjectMutation {
  createSubject: {
    _id: string;
  };
}

const AutocompleteSubjects = ({ query, onQueryChange, onSelect, selectedID }: Props) => {
  const handleSubjectsLoaded = (res: any) => {
    if (selectedID) {
      const selectedItem = res.subjects.find((item: SubjectType) => item._id === selectedID);
      if (!selectedItem) return;
      onQueryChange(selectedItem.name);
    }
  };

  const subjectsQuery = useQuery(GET_SUBJECTS, {
    onCompleted: handleSubjectsLoaded
  });
  const [subjectCreated, setSubjectCreated] = useState(false);
  const isSubjectsAvailable = subjectsQuery && subjectsQuery.data;
  const subjects = isSubjectsAvailable
    ? subjectsQuery.data.subjects.sort((a: SubjectType, b: SubjectType) =>
        a.name.localeCompare(b.name)
      )
    : [];

  const handleSubjectAdded = (res: SubjectMutation) => {
    setSubjectCreated(true);
    onSelect(res.createSubject._id);
  };

  const [addPayment, dataMutation] = useMutation(ADD_SUBJECT, {
    onCompleted: handleSubjectAdded
  });

  const handleChange = (value: string) => {
    setSubjectCreated(false);
    onQueryChange(value);
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    const selectedSubject = subjects.find((item: SubjectType) => item._id === id);
    onQueryChange(selectedSubject.name);
  };

  const handleAddNew = () => {
    addPayment({
      variables: {
        name: query
      }
    });
  };

  return (
    <div className="input-wrapper">
      <Autocomplete
        items={subjects.map((subject: SubjectType) => ({
          id: subject._id,
          title: subject.name
        }))}
        onAddNew={handleAddNew}
        onChange={handleChange}
        onSelect={handleSelect}
        query={query}
        label="Subject"
        placeholder="Subject"
      />
      {subjectCreated && <p className="text-green">New subject created</p>}
      {dataMutation.error && <p className="text-error">{dataMutation.error.message}</p>}
      {dataMutation.loading && <p className="text-loading">{dataMutation.loading}</p>}
    </div>
  );
};

export default AutocompleteSubjects;
