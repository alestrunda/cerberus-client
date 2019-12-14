import gql from "graphql-tag";

export const GET_DEBT = gql`
  query($id: String!) {
    debt(_id: $id) {
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
        name
      }
    }
  }
`;

export const GET_DEBTS = gql`
  query {
    debts {
      _id
      amount
      date
      description
      isPaid
      partial
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
