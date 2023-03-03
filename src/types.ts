import { ApolloError } from '@apollo/client';

export interface Item {
    id?: string;
    fullName: string;
    description: string;
    language: 'TypeScript' | 'JavaScript' | 'Java' | 'Python' | 'Ruby';
    forksCount: number;
    stargazersCount: number;
    ratingAverage: number;
    reviewCount: number;
    ownerAvatarUrl: string;
}

export interface RepositoryResult {
    totalCount: number;
    pageInfo: {
        [key: string]: number | boolean | string;
    };
    edges: {
        node: Item;
        cursor: string;
    }[];
}

export interface AuthenticateInput {
    username: string;
    password: string;
}

export interface SignInContainerProps {
    error?: ApolloError | undefined;
    onSubmit: (values: AuthenticateInput) => Promise<void>;
}
