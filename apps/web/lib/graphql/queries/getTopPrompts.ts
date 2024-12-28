import { gql } from '@apollo/client';

export const GET_TOP_PROMPTS = gql`
  query GetTopPrompts($timeFrame: String, $limit: Int) {
    topPrompts(timeFrame: $timeFrame, limit: $limit) {
      id
      title
      description
      category
      tags
      author {
        id
        username
      }
      createdAt
      likes
      comments
      averageRating
      totalReviews
    }
  }
`;
