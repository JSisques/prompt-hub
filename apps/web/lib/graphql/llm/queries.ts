import { gql } from '@apollo/client';

export const GET_LLMS = gql`
  query GetLlms {
    getLlms {
      id
      name
    }
  }
`;
