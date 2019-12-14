import React, { useState } from "react";
import Autocomplete from "../components/Autocomplete";
import Tag from "../components/Tag";
import TagType from "../interfaces/Tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_TAG } from "../gql/tag/mutations";
import { GET_TAGS } from "../gql/tag/queries";

interface Props {
  activeTags: TagType[];
  onSelect(tag: TagType): void;
  onRemove(tagID: string): void;
}

interface TagMutation {
  createTag: TagType;
}

const AutocompleteTags = ({ activeTags, onSelect, onRemove: onUnselect }: Props) => {
  const handleTagsLoaded = (res: any) => {
    setAllTags(res.tags);
  };

  const [query, setQuery] = useState("");
  const tagsQuery = useQuery(GET_TAGS, { onCompleted: handleTagsLoaded });
  const [tagCreated, setTagCreated] = useState(false);
  const [allTags, setAllTags] = useState<TagType[]>([]);
  const isTagsAvailable = tagsQuery && tagsQuery.data;
  const tags = isTagsAvailable
    ? tagsQuery.data.tags.sort((a: TagType, b: TagType) => a.name.localeCompare(b.name))
    : [];

  const handleTagAdded = (res: TagMutation) => {
    setTagCreated(true);
    addTag(res.createTag);
  };

  const [createNewTag, dataMutation] = useMutation(ADD_TAG, {
    onCompleted: handleTagAdded
  });

  const handleChange = (value: string) => {
    setTagCreated(false);
    setQuery(value);
  };

  const handleSelect = (id: String) => {
    setQuery("");
    addTag(tags.find((tag: TagType) => tag._id === id));
  };

  const addTag = (tag: TagType) => {
    onSelect(tag);
  };

  const handleAddNew = () => {
    createNewTag({
      variables: {
        name: query
      }
    });
  };

  const handleTagClose = (tagID: string) => {
    onUnselect(tagID);
  };

  const possibleTagsToSelect = allTags.filter(
    tag => activeTags.findIndex(activeTag => activeTag._id === tag._id) === -1
  );

  return (
    <div className="input-wrapper">
      <Autocomplete
        items={possibleTagsToSelect.map((tag: TagType) => ({
          id: tag._id,
          title: tag.name
        }))}
        label="Tags"
        onAddNew={handleAddNew}
        onChange={handleChange}
        onSelect={handleSelect}
        query={query}
        placeholder="Tag"
      />
      {activeTags.length > 0 && (
        <div className="mt10">
          {activeTags.map((tag: TagType) => (
            <Tag key={tag._id} className="label" onClose={handleTagClose} {...tag} />
          ))}
        </div>
      )}
      {tagCreated && <p className="text-success">New tag created</p>}
      {dataMutation.error && <p className="text-error">{dataMutation.error.message}</p>}
      {dataMutation.loading && <p className="text-loading">{dataMutation.loading}</p>}
    </div>
  );
};

export default AutocompleteTags;
