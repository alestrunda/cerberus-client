import gql from "graphql-tag";

export const ADD_OUTLAY = gql`
  mutation(
    $amount: Float
    $date: Float
    $description: String
    $subjectID: String!
    $tags: [String]
  ) {
    createOutlay(
      amount: $amount
      date: $date
      subjectID: $subjectID
      description: $description
      tags: $tags
    ) {
      _id
      amount
      subject {
        _id
        name
      }
    }
  }
`;

export const EDIT_OUTLAY = gql`
  mutation(
    $_id: String!
    $amount: Float
    $date: Float
    $description: String
    $subjectID: String!
    $tags: [String]
  ) {
    editOutlay(
      _id: $_id
      amount: $amount
      date: $date
      subjectID: $subjectID
      description: $description
      tags: $tags
    ) {
      _id
      amount
      date
      description
      subject {
        _id
        name
      }
      tags {
        _id
      }
    }
  }
`;
