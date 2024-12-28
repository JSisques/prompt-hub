import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
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
    }
  }
`;
