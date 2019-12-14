import gql from "graphql-tag";

export const GET_TAGS = gql`
  query {
    tags {
      _id
      name
    }
  }
`;
