import gql from "graphql-tag";

export const ADD_DEBT = gql`
  mutation(
    $amount: Float
    $date: Float
    $description: String
    $hours: Float
    $isPaid: Boolean
    $partial: Float
    $subjectID: String!
    $tags: [String]
  ) {
    createDebt(
      amount: $amount
      date: $date
      hours: $hours
      isPaid: $isPaid
      partial: $partial
      subjectID: $subjectID
      description: $description
      tags: $tags
    ) {
      _id
      amount
      subject {
        name
      }
    }
  }
`;

export const EDIT_DEBT = gql`
  mutation(
    $_id: String!
    $amount: Float
    $date: Float
    $description: String
    $hours: Float
    $isPaid: Boolean
    $partial: Float
    $subjectID: String!
    $tags: [String]
  ) {
    editDebt(
      _id: $_id
      amount: $amount
      date: $date
      description: $description
      hours: $hours
      isPaid: $isPaid
      partial: $partial
      subjectID: $subjectID
      tags: $tags
    ) {
      _id
      amount
      date
      description
      hours
      isPaid
      partial
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

export const REMOVE_DEBT = gql`
  mutation($_id: String!) {
    removeDebt(_id: $_id) {
      _id
    }
  }
`;
