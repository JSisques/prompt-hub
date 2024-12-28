import { gql } from '@apollo/client';

export const LIKE_PROMPT = gql`
  mutation LikePrompt($id: String!) {
    likePrompt(id: $id) {
      id
      likes
    }
  }
`;
