import { gql } from '@apollo/client';

export const GET_PROMPTS_BY_CATEGORY = gql`
  query GetPromptsByCategory($categoryId: String!, $page: Int, $limit: Int) {
    promptsByCategory(categoryId: $categoryId, page: $page, limit: $limit) {
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
