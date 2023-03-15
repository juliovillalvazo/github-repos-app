import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../gql/queries';

const useRepositories = (orderBy = 'CREATED_BY', orderDirection = 'DESC') => {
    const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
        variables: {
            orderBy,
            orderDirection,
        },
        fetchPolicy: 'cache-and-network',
    });

    return {
        repositories: data?.repositories,
        loading,
        refetch,
        error,
    };
};

export default useRepositories;
