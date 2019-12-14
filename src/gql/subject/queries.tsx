import gql from "graphql-tag";

export const GET_SUBJECTS = gql`
  query {
    subjects {
      _id
      name
    }
  }
`;
