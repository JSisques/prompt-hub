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
        avatar
      }
      promptId
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: String!, $input: UpdateReviewInput!) {
    updateReview(id: $id, input: $input) {
      id
      comment
      rating
      updatedAt
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: String!) {
    deleteReview(id: $id) {
      success
      message
    }
  }
`;
