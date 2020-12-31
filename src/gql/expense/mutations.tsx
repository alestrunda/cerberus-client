import gql from "graphql-tag";

export const ADD_EXPENSE = gql`
  mutation(
    $amount: Float
    $date: Float
    $description: String
    $subjectID: String!
    $tags: [String]
  ) {
    createExpense(
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

export const EDIT_EXPENSE = gql`
  mutation(
    $_id: String!
    $amount: Float
    $date: Float
    $description: String
    $subjectID: String!
    $tags: [String]
  ) {
    editExpense(
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
