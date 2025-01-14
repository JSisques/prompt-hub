import { gql } from '@apollo/client';

export const GET_PROMPTS_BY_NAME = gql`
  query GetPromptsByName($name: String!) {
    getPromptsByName(name: $name) {
      id
      title
      slug
      description
      content
      example
      published
      likes
      createdAt
      updatedAt
      user {
        id
        email
        username
        name
        avatar
        bio
        active
        createdAt
        updatedAt
      }
      category {
        id
        name
        description
        createdAt
        updatedAt
      }
      llm {
        id
        name
        description
        createdAt
        updatedAt
      }
      comments {
        id
        content
        author {
          id
          username
          email
          avatar
        }
        createdAt
        updatedAt
      }
      reviews {
        id
        comment
        rating
        likes
        author {
          id
          username
          email
          avatar
        }
        createdAt
        updatedAt
      }
    }
  }
`;
