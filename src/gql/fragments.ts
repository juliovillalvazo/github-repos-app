import { gql } from '@apollo/client';

export const CORE_REPOSITORY_FIELDS = gql`
    fragment CoreRepositoryFields on Repository {
        description
        forksCount
        fullName
        id
        language
        ownerAvatarUrl
        ratingAverage
        reviewCount
        stargazersCount
    }
`;
