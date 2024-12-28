import { gql } from '@apollo/client';

export const CREATE_REVIEW = gql`
  mutation CreateReview($input: ReviewInput!) {
    createReview(input: $input) {
      id
      comment
      rating
      user {
        id
        username
      }
      promptId
      createdAt
      updatedAt
    }
  }
`;
