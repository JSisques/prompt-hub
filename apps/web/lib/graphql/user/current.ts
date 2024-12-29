import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      username
      email
      bio
      avatar
      createdAt
      prompts {
        id
        title
        likes
        comments
      }
      reviews {
        id
        comment
        rating
        promptId
      }
      savedPrompts {
        id
        title
      }
    }
  }
`;
