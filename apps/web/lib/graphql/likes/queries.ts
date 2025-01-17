import { gql } from '@apollo/client';

export const GET_LIKES = gql`
  query GetLikes($userId: String!) {
    getLikes(userId: $userId) {
      id
    }
  }
`;

export const GET_LIKE_BY_ID = gql`
  query GetLikeById($id: String!) {
    getLikeById(id: $id) {
      id
    }
  }
`;

export const GET_LIKES_BY_USER_ID = gql`
  query GetLikesByUserId($userId: String!) {
    getLikesByUserId(userId: $userId) {
      id
    }
  }
`;

export const GET_LIKES_BY_PROMPT_ID = gql`
  query GetLikesByPromptId($promptId: String!) {
    getLikesByPromptId(promptId: $promptId) {
      id
    }
  }
`;

export const GET_LIKES_BY_REVIEW_ID = gql`
  query GetLikesByReviewId($reviewId: String!) {
    getLikesByReviewId(reviewId: $reviewId) {
      id
    }
  }
`;
