import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../gql/queries';

const useRepositories = (
    orderBy = 'CREATED_AT',
    orderDirection = 'DESC',
    searchKeyword = '',
    first = 3,
    after = '',
) => {
    const { data, error, loading, fetchMore, refetch } = useQuery(
        GET_REPOSITORIES,
        {
            variables: {
                orderBy,
                orderDirection,
                searchKeyword,
                first,
                after,
            },
            fetchPolicy: 'cache-and-network',
        },
    );

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) return;

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                orderBy,
                orderDirection,
                searchKeyword,
                first,
            },
        });
    };

    return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        loading,
        refetch,
        error,
    };
};

export default useRepositories;
