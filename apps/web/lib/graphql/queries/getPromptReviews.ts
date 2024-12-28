import { gql } from '@apollo/client';

export const GET_PROMPT_REVIEWS = gql`
  query GetPromptReviews($promptId: String!, $page: Int, $limit: Int) {
    promptReviews(promptId: $promptId, page: $page, limit: $limit) {
      reviews {
        id
        comment
        rating
        user {
          id
          username
          avatar
        }
        createdAt
        updatedAt
      }
      total
      hasMore
      averageRating
    }
  }
`;
