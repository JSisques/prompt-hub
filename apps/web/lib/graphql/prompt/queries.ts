import { gql } from '@apollo/client';

export const GET_PROMPTS = gql`
  query GetPrompts {
    getPrompts {
      id
      title
      slug
      description
      content
      example
      published
      likes {
        id
      }
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
      tags {
        id
        name
        slug
        createdAt
        updatedAt
      }
      comments {
        id
      }
      reviews {
        id
      }
    }
  }
`;

export const GET_PROMPT_BY_ID = gql`
  query GetPromptById($id: String!) {
    getPromptById(id: $id) {
      id
      title
      slug
      description
      content
      example
      published
      likes {
        id
        userId
      }
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
      tags {
        id
        name
        slug
        createdAt
        updatedAt
      }
      comments {
        id
        content
        user {
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
        user {
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

export const GET_FAVORITES_BY_USER_ID = gql`
  query GetFavoritesByUserId($userId: String!) {
    getFavoritesByUserId(userId: $userId) {
      id
      title
      slug
      description
      content
      example
      published
      likes {
        id
      }
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
      tags {
        id
        name
        slug
        createdAt
        updatedAt
      }
      comments {
        id
      }
      reviews {
        id
      }
    }
  }
`;
