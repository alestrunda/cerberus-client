import gql from "graphql-tag";

export const GET_INCOME = gql`
  query($id: String!) {
    income(_id: $id) {
      _id
      amount
      date
      debt {
        _id
        amount
        subject {
          name
        }
      }
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

export const GET_INCOMES = gql`
  query {
    incomes {
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
