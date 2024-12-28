import { gql } from '@apollo/client';

export const GET_PROMPT = gql`
  query GetPrompt($id: String!) {
    prompt(id: $id) {
      id
      title
      prompt
      category
      tags
      author {
        id
        username
      }
      createdAt
      likes
      comments
      reviews {
        id
        comment
        rating
        user {
          id
          username
        }
        createdAt
        updatedAt
      }
    }
  }
`;
