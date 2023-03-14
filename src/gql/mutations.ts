import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
    mutation AUTHENTICATE($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation CREATE_REVIEW($review: CreateReviewInput) {
        createReview(review: $review) {
            repository {
                id
                ownerName
                name
            }
            rating
            text
        }
    }
`;

export const CREATE_USER = gql`
    mutation CREATE_USER($user: CreateUserInput) {
        createUser(user: $user) {
            id
            username
        }
    }
`;
