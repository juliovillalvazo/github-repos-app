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

export const REVIEW_FIELDS = gql`
    fragment ReviewFields on ReviewConnection {
        edges {
            node {
            id
            text
            rating
            createdAt
            user {
                id
                username
                }
            }
            cursor
        }
        pageInfo {
            endCursor
            startCursor
            hasNextPage
        }
    }
`;

export const REVIEW_FIELDS_ME = gql`
fragment ReviewFieldsME on ReviewConnection {
    edges {
        node {
            id
            text
            rating
            createdAt
            user {
                id
                username
            }
            repository {
                id
            }
        }
    }
}`;
