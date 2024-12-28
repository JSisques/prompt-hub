import { gql } from '@apollo/client';

export const GET_USER_COMMENTS = gql`
  query GetUserComments($userId: String!) {
    getUserComments(userId: $userId) {
      id
      content
      userId
      promptId
      createdAt
      updatedAt
    }
  }
`;
