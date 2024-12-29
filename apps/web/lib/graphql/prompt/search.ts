import { gql } from '@apollo/client';

export const SEARCH_PROMPTS = gql`
  query SearchPrompts($input: SearchPromptsInput!) {
    searchPrompts(input: $input) {
      prompts {
        id
        title
        description
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
      total
      hasMore
    }
  }
`;
