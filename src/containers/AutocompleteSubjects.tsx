import React, { useState } from "react";
import Autocomplete from "../components/Autocomplete";
import SubjectType from "../interfaces/Subject";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_SUBJECT } from "../gql/subject/mutations";
import { GET_SUBJECTS } from "../gql/subject/queries";
import SectionLoad from "../components/SectionLoad";

interface Props {
  error?: string;
  query: string;
  onQueryChange(query: string): void;
  onSelect(subject: SubjectType): void;
  selected?: SubjectType;
}

interface SubjectMutation {
  createSubject: SubjectType;
}

const AutocompleteSubjects = ({ error, query, onQueryChange, onSelect, selected }: Props) => {
  const handleSubjectsLoaded = (res: any) => {
    if (selected) {
      const selectedItem = res.subjects.find((item: SubjectType) => item._id === selected._id);
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
    onSelect(res.createSubject);
  };

  const [addPayment, dataMutation] = useMutation(ADD_SUBJECT, {
    onCompleted: handleSubjectAdded
  });

  const handleChange = (value: string) => {
    setSubjectCreated(false);
    onQueryChange(value);
  };

  const handleSelect = (id: string) => {
    const selectedSubject = subjects.find((item: SubjectType) => item._id === id);
    onSelect(selectedSubject);
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
    <SectionLoad isError={!!subjectsQuery.error} isLoading={subjectsQuery.loading} showLoadingIcon>
      <div className="input-wrapper">
        <Autocomplete
          className="autocomplete--subjects"
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
        {selected && <p className="text-fs-tiny text-gray ml5">Selected: {selected.name}</p>}
        {error && <p className="input-wrapper__error">{error}</p>}
        {dataMutation.error && <p className="input-wrapper__error">{dataMutation.error.message}</p>}
        {subjectCreated && <p className="text-green">New subject created</p>}
        {dataMutation.loading && <p className="text-loading">{dataMutation.loading}</p>}
      </div>
    </SectionLoad>
  );
};

export default AutocompleteSubjects;
