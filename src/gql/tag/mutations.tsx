import gql from "graphql-tag";

export const ADD_TAG = gql`
  mutation($name: String!) {
    createTag(name: $name) {
      _id
      name
    }
  }
`;
