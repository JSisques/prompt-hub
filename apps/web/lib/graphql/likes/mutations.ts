import { gql } from '@apollo/client';

export const CREATE_LIKE = gql`
  mutation CreateLike($input: CreateLikeInput!) {
    createLike(input: $input) {
      id
    }
  }
`;

export const UPDATE_LIKE = gql`
  mutation UpdateLike($id: String!, $input: UpdateLikeInput!) {
    updateLike(id: $id, input: $input) {
      id
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation DeleteLike($id: String!) {
    deleteLike(id: $id) {
      id
    }
  }
`;
