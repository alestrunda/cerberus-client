import { useState } from "react";
import { useTranslation } from "react-i18next";
import Autocomplete from "../components/Autocomplete";
import Tag from "../components/Tag";
import SectionLoad from "../components/SectionLoad";
import TagType from "../interfaces/Tag";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TAG } from "../gql/tag/mutations";
import { GET_TAGS } from "../gql/tag/queries";

interface Props {
  activeTags: TagType[];
  error?: string;
  onSelect(tag: TagType): void;
  onRemove(tagID: string): void;
}

interface TagMutation {
  createTag: TagType;
}

const AutocompleteTags = ({ activeTags, error, onSelect, onRemove: onUnselect }: Props) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [tagCreated, setTagCreated] = useState(false);
  const [allTags, setAllTags] = useState<TagType[]>([]);

  const handleTagsLoaded = (res: any) => {
    setAllTags(res.tags);
  };

  const tagsQuery = useQuery(GET_TAGS, { onCompleted: handleTagsLoaded });
  const isTagsAvailable = tagsQuery && tagsQuery.data;
  const tags = isTagsAvailable
    ? [...tagsQuery.data.tags].sort((a: TagType, b: TagType) => a.name.localeCompare(b.name))
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
    (tag) => activeTags.findIndex((activeTag) => activeTag._id === tag._id) === -1
  );

  return (
    <SectionLoad isError={!!tagsQuery.error} isLoading={tagsQuery.loading} showLoadingIcon>
      <div className="input-wrapper">
        <Autocomplete
          className="autocomplete--tags"
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
        {error && <div className="input-wrapper__error">{error}</div>}
        {dataMutation.error && <p className="input-wrapper__error">{dataMutation.error.message}</p>}
        {tagCreated && <p className="text-green">{t("New tag created")}</p>}
        {dataMutation.loading && <p className="text-loading">{dataMutation.loading}</p>}
      </div>
    </SectionLoad>
  );
};

export default AutocompleteTags;
