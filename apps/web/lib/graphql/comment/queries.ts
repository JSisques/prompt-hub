import { gql } from '@apollo/client';

export const GET_PROMPT_COMMENTS = gql`
  query GetPromptComments($promptId: String!) {
    getPromptComments(promptId: $promptId) {
      id
      content
      userId
      promptId
      createdAt
      updatedAt
    }
  }
`;
