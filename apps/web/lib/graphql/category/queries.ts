import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
    }
  }
`;

export const GET_TRENDING_CATEGORIES = gql`
  query GetTrendingCategories($timePeriod: String!) {
    getTrendingCategories(timePeriod: $timePeriod) {
      id
      name
    }
  }
`;
