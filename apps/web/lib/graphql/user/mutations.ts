import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      name
      username
      bio
      avatar
      active
    }
  }
`;
