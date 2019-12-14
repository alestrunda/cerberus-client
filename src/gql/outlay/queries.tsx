import gql from "graphql-tag";

export const GET_OUTLAY = gql`
  query($id: String!) {
    outlay(_id: $id) {
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

export const GET_OUTLAYS = gql`
  query {
    outlays {
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

export const REMOVE_OUTLAY = gql`
  mutation($_id: String!) {
    removeOutlay(_id: $_id) {
      _id
    }
  }
`;
