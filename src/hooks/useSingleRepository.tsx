import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../gql/queries';
import { SingleRepository } from '../types';
import { ApolloError } from '@apollo/client';

const useSingleRepository = (id: string | undefined, first = 3, after = '') => {
    if (!id) {
        return {
            error: new ApolloError({ errorMessage: 'No id was provided' }),
        };
    }

    const { data, error, loading, fetchMore, refetch } = useQuery<{
        repository: SingleRepository;
    }>(GET_REPOSITORY, {
        variables: { id, first, after },
        fetchPolicy: 'cache-and-network',
    });

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data?.repository.reviews?.pageInfo?.hasNextPage;

        if (!canFetchMore) return;

        fetchMore({
            variables: {
                after: data?.repository.reviews?.pageInfo.endCursor,
                id,
                first,
            },
        });
    };

    return {
        repository: data?.repository,
        fetchMore: handleFetchMore,
        loading,
        refetch,
        error,
    };
};

export default useSingleRepository;
