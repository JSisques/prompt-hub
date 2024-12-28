import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      title
      description
      prompts {
        id
        title
        description
        tags
        author {
          id
          username
        }
        createdAt
        likes
        comments
      }
    }
  }
`;
