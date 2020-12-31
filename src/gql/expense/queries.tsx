import gql from "graphql-tag";

export const GET_EXPENSE = gql`
  query($id: String!) {
    expense(_id: $id) {
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
        name
      }
    }
  }
`;

export const GET_EXPENSES = gql`
  query {
    expenses {
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
        name
      }
    }
  }
`;

export const REMOVE_EXPENSE = gql`
  mutation($_id: String!) {
    removeExpense(_id: $_id) {
      _id
    }
  }
`;
