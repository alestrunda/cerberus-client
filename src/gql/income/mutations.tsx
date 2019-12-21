import gql from "graphql-tag";

export const ADD_INCOME = gql`
  mutation(
    $amount: Float
    $date: Float
    $debtID: String
    $description: String
    $subjectID: String!
    $tags: [String]
  ) {
    createIncome(
      amount: $amount
      date: $date
      debtID: $debtID
      description: $description
      subjectID: $subjectID
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

export const EDIT_INCOME = gql`
  mutation(
    $_id: String!
    $amount: Float
    $date: Float
    $debtID: String
    $description: String
    $subjectID: String!
    $tags: [String]
  ) {
    editIncome(
      _id: $_id
      amount: $amount
      date: $date
      debtID: $debtID
      subjectID: $subjectID
      description: $description
      tags: $tags
    ) {
      _id
      amount
      date
      debtID
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

export const REMOVE_INCOME = gql`
  mutation($_id: String!) {
    removeIncome(_id: $_id) {
      _id
    }
  }
`;
