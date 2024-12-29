import { gql } from '@apollo/client';

export const LIKE_PROMPT = gql`
  mutation LikePrompt($id: String!) {
    likePrompt(id: $id) {
      id
      likes
    }
  }
`;

export const UNLIKE_PROMPT = gql`
  mutation UnlikePrompt($id: String!) {
    unlikePrompt(id: $id) {
      id
      likes
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: String!) {
    followUser(userId: $userId) {
      id
      followers {
        id
        username
      }
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($userId: String!) {
    unfollowUser(userId: $userId) {
      id
      followers {
        id
        username
      }
    }
  }
`;

export const REPORT_PROMPT = gql`
  mutation ReportPrompt($input: ReportInput!) {
    reportPrompt(input: $input) {
      success
      message
    }
  }
`;
