import { gql } from '@apollo/client';
import { CORE_REPOSITORY_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
    ${CORE_REPOSITORY_FIELDS}
    query GET_REPOSITORIES(
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
    ) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                cursor
                node {
                    ...CoreRepositoryFields
                }
            }
        }
    }
`;

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`;

export const GET_REPOSITORY = gql`
    ${CORE_REPOSITORY_FIELDS}
    query GetRepository($id: ID!) {
        repository(id: $id) {
            ownerName
            name
            createdAt
            watchersCount
            openIssuesCount
            url
            userHasReviewed
            reviews {
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
                }
            }
            ...CoreRepositoryFields
        }
    }
`;
