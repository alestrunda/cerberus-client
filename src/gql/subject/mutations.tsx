import gql from "graphql-tag";

export const ADD_SUBJECT = gql`
  mutation($name: String!) {
    createSubject(name: $name) {
      _id
    }
  }
`;
