import { gql } from '@apollo/client';
import { CORE_REPOSITORY_FIELDS, REVIEW_FIELDS, REVIEW_FIELDS_ME } from './fragments';

export const GET_REPOSITORIES = gql`
    ${CORE_REPOSITORY_FIELDS}
    query GET_REPOSITORIES(
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
        $first: Int
        $after: String
    ) {
        repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                cursor
                node {
                    ...CoreRepositoryFields
                }
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
`;

export const ME = gql`
${REVIEW_FIELDS_ME}
    query ME($seeReviews: Boolean! = false) {
        me {
            id
            username
            reviews @include(if: $seeReviews) {
                ...ReviewFieldsME
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query GetRepository($id: ID!, first: Int, after: String) {
        repository(id: $id, first: $first, after: $after) {
            ownerName
            name
            createdAt
            watchersCount
            openIssuesCount
            url
            userHasReviewed
            reviews {
                ...ReviewFields
            }
            ...CoreRepositoryFields
        }
    }
    ${REVIEW_FIELDS}
    ${CORE_REPOSITORY_FIELDS}
`;
