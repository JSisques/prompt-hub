import { gql } from '@apollo/client';

export const GET_PROMPTS = gql`
  query GetPrompts {
    prompts {
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
    }
  }
`;
