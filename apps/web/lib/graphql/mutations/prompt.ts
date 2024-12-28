import { gql } from '@apollo/client';

export const CREATE_PROMPT = gql`
  mutation CreatePrompt($input: CreatePromptInput!) {
    createPrompt(input: $input) {
      id
      title
      description
      prompt
      category
      tags
      author {
        id
        username
      }
      createdAt
    }
  }
`;

export const UPDATE_PROMPT = gql`
  mutation UpdatePrompt($id: String!, $input: UpdatePromptInput!) {
    updatePrompt(id: $id, input: $input) {
      id
      title
      description
      prompt
      category
      tags
    }
  }
`;

export const DELETE_PROMPT = gql`
  mutation DeletePrompt($id: String!) {
    deletePrompt(id: $id) {
      success
      message
    }
  }
`;

export const SAVE_PROMPT = gql`
  mutation SavePrompt($promptId: String!) {
    savePrompt(promptId: $promptId) {
      id
      savedPrompts {
        id
        title
      }
    }
  }
`;

export const UNSAVE_PROMPT = gql`
  mutation UnsavePrompt($promptId: String!) {
    unsavePrompt(promptId: $promptId) {
      id
      savedPrompts {
        id
        title
      }
    }
  }
`;
